# siteCours

## FR — Architecture et usage

### Architecture

- `frontend/`: Next.js (App Router) avec Tailwind + shadcn/ui.
- `backend/`: FastAPI pour le chatbot Groq.
- `docker-compose.yml`: orchestre les deux services.

### Flux chatbot (résumé)

1. **UI**: `frontend/src/app/chat/page.tsx` + composants `frontend/src/components/chat/*`.
2. **Proxy**: `frontend/src/app/api/chat/route.ts` envoie la requête vers `BACKEND_URL`.
3. **Backend**: `backend/app/main.py` reçoit `/chat`, prépare l'historique + placeholder RAG.
4. **Prompt**: `backend/app/prompts/system.yaml` est chargé au démarrage via `backend/app/services/prompt_loader.py`.
5. **Groq**: `backend/app/services/groq_client.py` injecte le prompt système en premier message.

### Variables d'environnement

Backend (jamais côté navigateur):
- `GROQ_API_KEY` (obligatoire)
- `GROQ_MODEL` (optionnel, défaut `llama-3.1-8b-instant`)
- `GROQ_TEMPERATURE` (optionnel, défaut `0.2`)

Frontend (serveur uniquement):
- `BACKEND_URL` (ex: `http://backend:8001` en Docker)

### Lancer avec Docker Compose

```bash
export GROQ_API_KEY="your_key"
export GROQ_MODEL="llama-3.1-8b-instant"
export GROQ_TEMPERATURE="0.2"

docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8001

Si le port 3000 est déjà pris, change la ligne `ports` dans `docker-compose.yml`.

### Lancer en local (sans Docker)

Backend:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export GROQ_API_KEY="your_key"
uvicorn app.main:app --reload --port 8001
```

Frontend:
```bash
cd frontend
export BACKEND_URL="http://localhost:8001"
npm install
npm run dev
```

### Où modifier les textes

- UI (FR/EN): `frontend/src/lib/i18n.ts`
- Guide chat (FR/EN): `frontend/src/lib/chat/prompts.ts`
- Prompt système (FR uniquement): `backend/app/prompts/system.yaml`

## EN — Architecture and usage

### Architecture

- `frontend/`: Next.js (App Router) with Tailwind + shadcn/ui.
- `backend/`: FastAPI for the Groq chatbot.
- `docker-compose.yml`: orchestrates both services.

### Chat flow (summary)

1. **UI**: `frontend/src/app/chat/page.tsx` + `frontend/src/components/chat/*`.
2. **Proxy**: `frontend/src/app/api/chat/route.ts` forwards to `BACKEND_URL`.
3. **Backend**: `backend/app/main.py` handles `/chat` and inserts the RAG placeholder.
4. **Prompt**: `backend/app/prompts/system.yaml` is loaded at startup via `backend/app/services/prompt_loader.py`.
5. **Groq**: `backend/app/services/groq_client.py` injects the system prompt as the first message.

### Environment variables

Backend (never in browser):
- `GROQ_API_KEY` (required)
- `GROQ_MODEL` (optional, default `llama-3.1-8b-instant`)
- `GROQ_TEMPERATURE` (optional, default `0.2`)

Frontend (server-only):
- `BACKEND_URL` (e.g. `http://backend:8001` in Docker)

### Run with Docker Compose

```bash
export GROQ_API_KEY="your_key"
export GROQ_MODEL="llama-3.1-8b-instant"
export GROQ_TEMPERATURE="0.2"

docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8001

If port 3000 is already taken, change the `ports` line in `docker-compose.yml`.

### Run locally (without Docker)

Backend:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export GROQ_API_KEY="your_key"
uvicorn app.main:app --reload --port 8001
```

Frontend:
```bash
cd frontend
export BACKEND_URL="http://localhost:8001"
npm install
npm run dev
```

### Where to update copy

- UI (FR/EN): `frontend/src/lib/i18n.ts`
- Chat guide (FR/EN): `frontend/src/lib/chat/prompts.ts`
- System prompt (FR only): `backend/app/prompts/system.yaml`
