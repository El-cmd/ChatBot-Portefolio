# Backend (FastAPI)

Chatbot backend for vloth.tech, powered by Groq.

## Local run

```bash
export GROQ_API_KEY="your_key"
export GROQ_MODEL="llama-3.1-8b-instant"
export GROQ_TEMPERATURE="0.2"

python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

uvicorn app.main:app --reload --port 8001
```

## Docker run

```bash
docker build -t sitecours-backend .
docker run -p 8001:8001 \
  -e GROQ_API_KEY="your_key" \
  -e GROQ_MODEL="llama-3.1-8b-instant" \
  -e GROQ_TEMPERATURE="0.2" \
  sitecours-backend
```

## Environment variables

- `GROQ_API_KEY`: required.
- `GROQ_MODEL`: optional, defaults to `llama-3.1-8b-instant`.
- `GROQ_TEMPERATURE`: optional, defaults to `0.2`.
- `KB_DIR`: optional, defaults to `../kb` (or `/app/kb` in Docker).
- `KB_INDEX_PATH`: optional, path to `kb.index.faiss` (overrides `KB_DIR`).
- `KB_META_PATH`: optional, path to `kb.index.meta.json` (overrides `KB_DIR`).
- `KB_TOP_K`: optional, defaults to `4`.
- `KB_MIN_SCORE`: optional, defaults to `0.0`.

## Endpoints

- `GET /health` -> `{ "status": "ok" }`
- `POST /chat` -> `{ "answer": "string" }`
