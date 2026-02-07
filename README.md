# ChatBot Portfolio Template

Template open-source pour creer un chatbot portfolio base sur une base de connaissance Markdown, avec RAG (FAISS) et generation LLM via Groq.

## Stack

- Frontend: Next.js 14 + React + Tailwind
- Backend: FastAPI + Groq SDK
- Retrieval: FAISS + SentenceTransformers
- Source de verite contenu: `kb/*.md`

## Architecture rapide

- `frontend/`: interface chat + rendu Markdown/UI blocks
- `backend/`: API `/health` et `/chat`
- `kb/`: fichiers Markdown + script de generation index FAISS
- `docs/`: documentation technique

## Prerequis

- Python 3.11+
- Node.js 20+
- npm
- (optionnel) Docker + Docker Compose

## Installation locale (venv + npm)

### 1) Cloner et entrer dans le repo

```bash
git clone git@github.com:El-cmd/ChatBot-Portefolio.git
cd ChatBot-Portefolio
```

### 2) Configurer les variables

```bash
cp .env.example .env
```

Renseignez au minimum `GROQ_API_KEY` dans `.env`.

### 3) Backend (venv)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ..
```

### 4) Frontend

```bash
cd frontend
npm install
cd ..
```

### 5) Lancer

Terminal 1 (backend):

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8001
```

Terminal 2 (frontend):

```bash
cd frontend
BACKEND_URL=http://localhost:8001 npm run dev
```

Frontend: `http://localhost:3000`

## Lancement Docker

```bash
docker compose up --build
```

## Generation de l'index FAISS (obligatoire apres modification de `kb/*.md`)

Le script `kb/build_faiss.py` lit les Markdown, les decoupe en chunks, cree les embeddings, puis ecrit:

- `kb/kb.index.faiss`
- `kb/kb.index.meta.json`

### Option A: depuis la racine

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r kb/requirements.txt
python3 kb/build_faiss.py --kb-dir kb
```

### Option B: depuis `kb/`

```bash
cd kb
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 build_faiss.py --kb-dir .
```

### Options utiles du script

```bash
python3 kb/build_faiss.py \
  --kb-dir kb \
  --chunk-size 800 \
  --chunk-overlap 120 \
  --model sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2
```

- `--chunk-size`: taille max d'un chunk (caracteres)
- `--chunk-overlap`: overlap entre chunks
- `--model`: modele d'embedding SentenceTransformers
- `--index-out`: nom du fichier FAISS de sortie
- `--meta-out`: nom du fichier metadata de sortie

## Que contiennent les requirements

### `backend/requirements.txt`

- `fastapi`, `uvicorn`: API backend
- `pydantic`, `pydantic-settings`: validation + config env
- `PyYAML`: chargement prompt YAML
- `groq`: client LLM Groq
- `faiss-cpu`, `numpy`, `sentence-transformers`: retrieval RAG

### `kb/requirements.txt`

- `faiss-cpu`, `numpy`, `sentence-transformers`
- Utilises uniquement pour construire/reconstruire l'index KB

## Contrat API

### `POST /chat`

Request:

```json
{
  "message": "string",
  "history": [{ "role": "user", "content": "..." }]
}
```

Response:

```json
{
  "answer": "string",
  "sources": [
    { "id": "...", "source": "...", "chunk_index": 0, "score": 0.0, "text": "..." }
  ],
  "attachments": [
    { "type": "image", "url": "...", "alt": "...", "source_id": "..." }
  ]
}
```

## Notes importantes

- Ne versionnez jamais vos secrets (`.env` est ignore).
- Si vous changez les fichiers dans `kb/`, regenez l'index FAISS avant de tester.
- Le front interprete les blocs Markdown `ui` whitelistes: `buttons`, `image`, `file`.

## Ajouter des boutons dans le chatbot

Les boutons se declarent directement dans vos fichiers `kb/*.md` via un bloc Markdown `ui`.

Exemple:

````md
```ui
buttons:
  - label: Voir mon site
    url: https://your-website.com
    style: primary
    icon: globe
  - label: M'ecrire par email
    url: mailto:hello@example.com
    style: secondary
    icon: mail
```
````

Regles utiles:

- `label`: texte affiche sur le bouton.
- `url`: lien du bouton. Protocoles acceptes: `https://`, `http://`, `mailto:`, `tel:`, ou chemin interne (`/contact`).
- `style`: `primary` ou `secondary`.
- `icon` (optionnel): `linkedin`, `github`, `mail`, `phone`, `globe`, `file`.
- Les blocs `ui` invalides sont ignores (pas d'execution HTML arbitraire).
- Les blocs sont rendus dans l'ordre d'apparition dans le Markdown.

Apres modification des fichiers KB:

```bash
python3 kb/build_faiss.py --kb-dir kb
```

## Licence

MIT (`LICENSE`).
