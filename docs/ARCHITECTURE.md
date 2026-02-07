# Architecture

This document explains how the frontend and backend are separated and how the chatbot flow works.

## Schéma (Mermaid)

```mermaid
flowchart TD
  A[Utilisateur] --> B[Frontend Next.js]
  B -->|POST /api/chat| C[API proxy Next.js]
  C -->|POST /chat| D[Backend FastAPI]
  D --> E[Charge prompt système]
  D --> F[Charge index FAISS + metadata]
  D --> G[Vectorise la requête (SentenceTransformers)]
  G --> H[Recherche sémantique FAISS (top-k)]
  H --> I[Construit EXCERPTS + sources + attachments]
  I --> J[Groq LLM]
  J --> K[Réponse + sources + attachments]
  K --> B
```

## High-level structure

```
siteCours/
  frontend/   # Next.js App Router (UI + API proxy)
  backend/    # FastAPI (Groq chatbot)
  docker-compose.yml
```

## Services and responsibilities

- Frontend (Next.js)
  - UI pages and components.
  - Chat UI state and rendering.
  - API proxy route: `/api/chat` forwards to backend.
  - Uses BACKEND_URL server-side only.

- Backend (FastAPI)
  - Validates chat payload with Pydantic.
  - Loads system prompt from YAML at startup.
  - Calls Groq LLM (no streaming).
  - Returns `{ "answer": "string" }`.
  - Exposes `/health` and `/chat`.

## Chat request flow

1. User types a message in `frontend/src/app/chat/page.tsx`.
2. `frontend/src/app/api/chat/route.ts` forwards the POST to `BACKEND_URL`.
3. `backend/app/main.py`:
   - Merges history + user message.
   - Inserts a placeholder for future RAG excerpts.
   - Calls `generate_answer()`.
4. `backend/app/services/groq_client.py`:
   - Injects system prompt first.
   - Sends request to Groq.
5. Backend returns `{ "answer": "..." }`, frontend renders it.

## System prompt loading

- YAML file: `backend/app/prompts/system.yaml`
- Loader: `backend/app/services/prompt_loader.py`
- Validates required fields:
  - assistant
  - rules

The system prompt stays in the backend only and is never sent to the browser.

## Environment variables

Backend:
- GROQ_API_KEY (required)
- GROQ_MODEL (optional, default llama3-8b-8192)
- GROQ_TEMPERATURE (optional, default 0.2)

Frontend:
- BACKEND_URL (server-side only)

## Ports

- Frontend: 3000
- Backend: 8001

## Docker Compose

`docker-compose.yml` defines:
- frontend -> build ./frontend, uses BACKEND_URL=http://backend:8001
- backend -> build ./backend, expects GROQ_* env vars

## Future RAG placeholder

The `/chat` handler includes a clear placeholder where retrieved EXCERPTS
will be injected before the chat history. This keeps the architecture ready
for RAG without adding embeddings yet.
