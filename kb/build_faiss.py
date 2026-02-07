#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

import faiss
import numpy as np
from sentence_transformers import SentenceTransformer


def chunk_text(text: str, chunk_size: int, chunk_overlap: int) -> list[str]:
    cleaned = re.sub(r"\n{3,}", "\n\n", text).strip()
    if not cleaned:
        return []
    if len(cleaned) <= chunk_size:
        return [cleaned]
    step = max(1, chunk_size - chunk_overlap)
    return [cleaned[i : i + chunk_size] for i in range(0, len(cleaned), step)]


def load_chunks(kb_dir: Path, chunk_size: int, chunk_overlap: int) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []
    for path in sorted(kb_dir.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        for index, chunk in enumerate(chunk_text(text, chunk_size, chunk_overlap)):
            items.append(
                {
                    "id": f"{path.name}#chunk{index}",
                    "source": path.name,
                    "chunk_index": str(index),
                    "text": chunk
                }
            )
    return items


def build_index(vectors: np.ndarray) -> faiss.Index:
    dimension = vectors.shape[1]
    index = faiss.IndexFlatIP(dimension)
    index.add(vectors)
    return index


def main() -> None:
    parser = argparse.ArgumentParser(description="Vectorize KB markdown files into FAISS index.")
    parser.add_argument("--kb-dir", default=".", help="Path to KB markdown folder.")
    parser.add_argument("--index-out", default="kb.index.faiss", help="FAISS index output filename.")
    parser.add_argument("--meta-out", default="kb.index.meta.json", help="Metadata output filename.")
    parser.add_argument("--chunk-size", type=int, default=800, help="Chunk size in characters.")
    parser.add_argument("--chunk-overlap", type=int, default=120, help="Chunk overlap in characters.")
    parser.add_argument(
        "--model",
        default="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
        help="SentenceTransformers model name or local path.",
    )
    args = parser.parse_args()

    kb_dir = Path(args.kb_dir).resolve()
    if not kb_dir.exists():
        raise SystemExit(f"KB directory not found: {kb_dir}")

    chunks = load_chunks(kb_dir, args.chunk_size, args.chunk_overlap)
    if not chunks:
        raise SystemExit("No markdown files found to index.")

    model = SentenceTransformer(args.model)
    texts = [item["text"] for item in chunks]
    embeddings = model.encode(texts, normalize_embeddings=True, show_progress_bar=True)
    vectors = np.asarray(embeddings, dtype="float32")

    index = build_index(vectors)
    faiss.write_index(index, str(kb_dir / args.index_out))

    meta_path = kb_dir / args.meta_out
    meta_payload = {
        "model": args.model,
        "chunk_size": args.chunk_size,
        "chunk_overlap": args.chunk_overlap,
        "items": chunks,
    }
    meta_path.write_text(json.dumps(meta_payload, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Indexed {len(chunks)} chunks.")
    print(f"FAISS index: {kb_dir / args.index_out}")
    print(f"Metadata: {meta_path}")


if __name__ == "__main__":
    main()
