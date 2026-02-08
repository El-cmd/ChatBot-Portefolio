from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import json
import re
from typing import Any

import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

from app.core.config import get_settings


RAG_INSTRUCTIONS = (
    "Tu dois repondre uniquement avec les informations contenues dans EXCERPTS. "
    "Si EXCERPTS contient un bloc ```ui, recopie ce bloc exactement dans ta reponse sans le modifier. "
    "Si les extraits ne contiennent pas la reponse, dis-le clairement et propose /contact. "
    "N'invente rien."
)

_IMAGE_MD_RE = re.compile(r"!\[(?P<alt>[^\]]*)\]\((?P<url>[^)]+)\)")
_IMAGE_HTML_RE = re.compile(
    r"<img\s+[^>]*src=[\"'](?P<url>[^\"']+)[\"'][^>]*>",
    re.IGNORECASE,
)


@dataclass(frozen=True)
class RagHit:
    id: str
    source: str
    chunk_index: int
    text: str
    score: float


@dataclass(frozen=True)
class RagResources:
    index: faiss.Index
    items: list[dict[str, Any]]
    embedder: SentenceTransformer
    top_k: int
    min_score: float


@dataclass(frozen=True)
class RagContext:
    hits: list[RagHit]
    excerpts: str
    attachments: list[dict[str, Any]]


def _resolve_kb_dir() -> Path:
    settings = get_settings()
    if settings.kb_dir:
        return Path(settings.kb_dir)

    candidates = [
        Path("/app/kb"),
        Path.cwd() / "kb",
        Path(__file__).resolve().parents[3] / "kb",
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate
    return candidates[-1]


def _resolve_paths() -> tuple[Path, Path]:
    settings = get_settings()
    if settings.kb_index_path and settings.kb_meta_path:
        return Path(settings.kb_index_path), Path(settings.kb_meta_path)

    kb_dir = _resolve_kb_dir()
    index_path = Path(settings.kb_index_path) if settings.kb_index_path else kb_dir / "kb.index.faiss"
    meta_path = Path(settings.kb_meta_path) if settings.kb_meta_path else kb_dir / "kb.index.meta.json"
    return index_path, meta_path


def load_rag_resources() -> RagResources:
    index_path, meta_path = _resolve_paths()
    if not index_path.exists():
        raise RuntimeError(f"FAISS index not found: {index_path}")
    if not meta_path.exists():
        raise RuntimeError(f"FAISS metadata not found: {meta_path}")

    meta = json.loads(meta_path.read_text(encoding="utf-8"))
    items = meta.get("items")
    model_name = meta.get("model")
    if not isinstance(items, list) or not items:
        raise RuntimeError("FAISS metadata does not contain any items.")
    if not isinstance(model_name, str) or not model_name.strip():
        raise RuntimeError("FAISS metadata does not define a model name.")

    index = faiss.read_index(str(index_path))
    embedder = SentenceTransformer(model_name.strip())

    settings = get_settings()
    return RagResources(
        index=index,
        items=items,
        embedder=embedder,
        top_k=max(1, settings.kb_top_k),
        min_score=settings.kb_min_score,
    )


def _coerce_chunk_index(raw: Any) -> int:
    try:
        return int(raw)
    except (TypeError, ValueError):
        return 0


def _extract_attachments(hits: list[RagHit]) -> list[dict[str, Any]]:
    attachments: list[dict[str, Any]] = []
    seen: set[str] = set()

    for hit in hits:
        for match in _IMAGE_MD_RE.finditer(hit.text):
            url = match.group("url").strip()
            if not url or url in seen:
                continue
            seen.add(url)
            attachments.append(
                {
                    "type": "image",
                    "url": url,
                    "alt": match.group("alt").strip() or None,
                    "source_id": hit.id,
                }
            )

        for match in _IMAGE_HTML_RE.finditer(hit.text):
            url = match.group("url").strip()
            if not url or url in seen:
                continue
            seen.add(url)
            attachments.append(
                {
                    "type": "image",
                    "url": url,
                    "alt": None,
                    "source_id": hit.id,
                }
            )

    return attachments


def retrieve_context(resources: RagResources, query: str) -> RagContext:
    vector = resources.embedder.encode([query], normalize_embeddings=True)
    vectors = np.asarray(vector, dtype="float32")

    scores, indices = resources.index.search(vectors, resources.top_k)
    hits: list[RagHit] = []

    for score, idx in zip(scores[0], indices[0]):
        if idx < 0 or idx >= len(resources.items):
            continue
        if score < resources.min_score:
            continue

        item = resources.items[idx]
        hits.append(
            RagHit(
                id=str(item.get("id", "")),
                source=str(item.get("source", "")),
                chunk_index=_coerce_chunk_index(item.get("chunk_index")),
                text=str(item.get("text", "")),
                score=float(score),
            )
        )

    excerpts = "\n\n".join(f"[{hit.id}] {hit.text}" for hit in hits)
    attachments = _extract_attachments(hits)

    return RagContext(hits=hits, excerpts=excerpts, attachments=attachments)


def build_rag_prompt(excerpts: str) -> str:
    if not excerpts:
        return f"{RAG_INSTRUCTIONS}\n\nEXCERPTS:\n(Aucun extrait trouve.)"
    return f"{RAG_INSTRUCTIONS}\n\nEXCERPTS:\n{excerpts}"
