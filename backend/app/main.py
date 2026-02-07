from __future__ import annotations

from typing import Literal

import logging

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field

from app.services.groq_client import generate_answer
from app.services.prompt_loader import load_system_prompt
from app.services.rag_service import build_rag_prompt, load_rag_resources, retrieve_context

app = FastAPI(title="vloth.tech chatbot backend", version="0.1.0")
logger = logging.getLogger("uvicorn.error")


class HistoryMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1)
    history: list[HistoryMessage] = Field(default_factory=list)


class Source(BaseModel):
    id: str
    source: str
    chunk_index: int
    score: float
    text: str


class Attachment(BaseModel):
    type: Literal["image"]
    url: str
    alt: str | None = None
    source_id: str | None = None


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source] = Field(default_factory=list)
    attachments: list[Attachment] = Field(default_factory=list)


@app.on_event("startup")
def load_prompt_on_startup() -> None:
    app.state.system_prompt = load_system_prompt()
    app.state.rag_resources = load_rag_resources()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: Request, payload: ChatRequest) -> ChatResponse:
    system_prompt: str = request.app.state.system_prompt
    rag_resources = request.app.state.rag_resources

    messages: list[dict[str, str]] = []

    rag_context = retrieve_context(rag_resources, payload.message)
    messages.append({"role": "system", "content": build_rag_prompt(rag_context.excerpts)})

    messages.extend([item.model_dump() for item in payload.history])
    messages.append({"role": "user", "content": payload.message})

    try:
        answer = generate_answer(system_prompt, messages)
    except Exception as exc:  # noqa: BLE001 - provide a stable HTTP response
        logger.exception("Groq request failed")
        raise HTTPException(status_code=502, detail="LLM provider error.") from exc

    if not answer:
        raise HTTPException(status_code=502, detail="Empty response from LLM provider.")

    sources = [
        Source(
            id=hit.id,
            source=hit.source,
            chunk_index=hit.chunk_index,
            score=hit.score,
            text=hit.text,
        )
        for hit in rag_context.hits
    ]
    attachments = [Attachment(**item) for item in rag_context.attachments]

    return ChatResponse(answer=answer, sources=sources, attachments=attachments)
