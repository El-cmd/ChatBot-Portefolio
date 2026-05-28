# AGENT.md

## Purpose

This repository is a multi-service portfolio workspace with three active product surfaces:

- `frontend/`: React + Vite + Tailwind portfolio UI
- `backend/`: FastAPI chatbot backend using Groq + local RAG
- `cms/strapi/`: Strapi CMS backed by PostgreSQL for editable portfolio content

The project is primarily developed through Docker Compose from the repository root.

---

## High-Level Architecture

### Frontend

- Stack: React, React Router, Vite, Tailwind v4
- Entry points:
  - `frontend/src/main.tsx`
  - `frontend/src/App.tsx`
- Shared layout:
  - `frontend/src/layouts/AppShell.tsx`
- Main routes:
  - `/` -> `HomePage`
  - `/projects` -> `ProjectsPage`
  - `/about` -> `AboutPage`
  - `/chat` -> `ChatPage`
  - `/contact` -> `ContactPage`

### CMS

- Stack: Strapi v5 + PostgreSQL 16
- Admin URL: `http://localhost:1337/admin`
- Public API base: `http://localhost:1337/api`
- Docker service names:
  - `strapi`
  - `postgres`

### Chatbot backend

- Stack: FastAPI + Groq + FAISS + `sentence-transformers`
- Base URL in dev: `http://localhost:8001`
- Main endpoint:
  - `POST /chat`
- Health:
  - `GET /health`

---

## Root Commands

All orchestration is driven from the root `Makefile`.

Important targets:

- `make up`: start all services
- `make up-frontend`: start frontend only
- `make up-chatbot`: start chatbot backend only
- `make up-strapi`: start Strapi only
- `make up-front-cms`: start PostgreSQL, wait for health, then start frontend + Strapi
- `make up-build`: rebuild and start all services
- `make up-build-front-cms`: rebuild and start frontend + Strapi stack
- `make down`: stop and remove containers
- `make logs`: tail logs for frontend, backend, strapi, postgres
- `make build`: build backend + frontend + frontend-prod + strapi
- `make build-no-chatbot`: build frontend images only
- `make build-strapi`: build Strapi only

Important implementation detail:

- The Makefile uses `COMPOSE_BAKE=false docker compose ...`
- Keep that unless the local Docker Compose / buildx issue is explicitly resolved

---

## Docker Service Map

Defined in `docker-compose.yml`.

### `frontend`

- Dev server on `5173`
- Mounts local source into `/app`
- Depends on `backend` and `strapi`
- Uses Vite proxy environment variables:
  - `VITE_BACKEND_PROXY_URL=http://backend:8001`
  - `VITE_STRAPI_PROXY_URL=http://strapi:1337`

### `frontend-prod`

- Nginx-served production build on `8080`
- Uses `frontend/docker/nginx/default.conf`

### `backend`

- FastAPI service on `8001`
- Mounts `./kb` read-only into `/app/kb`

### `postgres`

- Persistent data volume: `strapi_postgres_data`
- Healthcheck required before `strapi` starts cleanly

### `strapi`

- Dev mode on `1337`
- Mounts local Strapi app into `/opt/app`
- Persistent volumes:
  - `strapi_node_modules`
  - `strapi_uploads`

---

## Frontend Content Model

There are two distinct content sources in the frontend:

### Static site copy

Stored in:

- `frontend/src/data/portfolio.ts`
- `frontend/src/lib/i18n.ts`

Use these files when changing:

- navbar labels
- hero/about/contact/chat copy
- UI labels and button text
- language-specific strings

Current navigation label detail:

- the `/projects` tab is displayed as `Hub`
- route is still `/projects`

### CMS-driven project cards

`ProjectsPage` no longer uses hardcoded project cards.

Relevant files:

- `frontend/src/pages/ProjectsPage.tsx`
- `frontend/src/lib/strapi.ts`
- `frontend/src/types/strapi.ts`

Flow:

- frontend requests `/cms/projects?populate=media&sort=date:desc`
- Vite rewrites `/cms/*` to Strapi `/api/*`
- media files are served through `/uploads/*`

Do not change `ProjectsPage` assuming local fake data is still the source of truth. For project cards, Strapi is the source of truth.

---

## Strapi Model

The current CMS content type is:

- `Project`

Schema file:

- `cms/strapi/src/api/project/content-types/project/schema.json`

Fields:

- `name`: string, required
- `media`: single media, image or video
- `git_url`: string
- `project_url`: string
- `description`: text
- `date`: date

Important Strapi behavior:

- `draftAndPublish` is enabled
- saving is not enough; a project must be published to appear in public queries

For the frontend to read projects:

1. open `Settings`
2. go to `Users & Permissions Plugin -> Roles -> Public`
3. enable `find` and `findOne` for `Project`
4. save

If those permissions are missing:

- frontend project requests return `403`
- `ProjectsPage` shows an error state

---

## Frontend Proxy Behavior

Development proxy configuration lives in:

- `frontend/vite.config.ts`

Current proxy rules:

- `/api` -> backend `http://backend:8001`
- `/cms` -> Strapi `http://strapi:1337/api`
- `/uploads` -> Strapi `http://strapi:1337/uploads`

Production proxy configuration lives in:

- `frontend/docker/nginx/default.conf`

If a frontend call fails, verify whether the failing path is:

- `/api/...` -> chatbot backend issue
- `/cms/...` -> Strapi API issue
- `/uploads/...` -> Strapi media issue

---

## Chatbot Backend Notes

Key files:

- `backend/app/main.py`
- `backend/app/services/rag_service.py`
- `backend/app/services/groq_client.py`
- `backend/app/services/prompt_loader.py`
- `backend/app/core/config.py`

Startup behavior:

- on FastAPI startup, the app loads:
  - system prompt
  - RAG resources

Critical requirement:

- the backend expects FAISS artifacts to exist in `kb/`
- required files:
  - `kb/kb.index.faiss`
  - `kb/kb.index.meta.json`

If they are missing, backend startup fails with a `FAISS index not found` runtime error.

That failure is not a frontend bug; it is a missing RAG build artifact.

Heavy backend dependencies:

- `sentence-transformers`
- `faiss-cpu`
- `numpy`

This is the main reason backend image builds are slow.

---

## Known Stability / Dev Issues

### 1. Browser cache or extension noise on Vite dev

Observed behavior:

- main browser profile may show a white page
- private window works
- clearing site data fixes it

Typical symptoms:

- `@react-refresh` aborted
- `NS_BINDING_ABORTED`
- MetaMask / SES / lockdown logs in browser console

Interpretation:

- this is usually a browser-profile or extension issue
- it is not evidence that Strapi or the database is broken

Mitigations already in code:

- global frontend error boundary
- lazy route loading
- safer `localStorage` access
- `IntersectionObserver` fallback

### 2. Strapi media streaming `ECONNRESET` / `EPIPE`

Observed on MP4 hover preview requests.

Meaning:

- browser interrupted a partial media request
- normal during video preview behavior

Mitigation already added:

- `cms/strapi/src/index.js` filters expected disconnect errors so logs stay cleaner

### 3. Frontend proxy race during Strapi restart

If `strapi` restarts while frontend is already up, Vite may log proxy errors like:

- `connect ECONNREFUSED ...:1337`

This is transient unless the service stays down.

---

## Where to Edit What

### Change navbar / site labels / static copy

- `frontend/src/data/portfolio.ts`
- `frontend/src/lib/i18n.ts`

### Change project cards data

- in Strapi admin
- not in `portfolio.ts`

### Change project card rendering

- `frontend/src/pages/ProjectsPage.tsx`
- `frontend/src/lib/strapi.ts`
- `frontend/src/types/strapi.ts`

### Change chatbot behavior

- `backend/app/main.py`
- `backend/app/services/*`
- `backend/app/prompts/system.yaml`
- `kb/*.md`

### Change Strapi schema

- `cms/strapi/src/api/project/content-types/project/schema.json`

If schema changes affect public frontend rendering, update:

- `frontend/src/types/strapi.ts`
- `frontend/src/lib/strapi.ts`
- `frontend/src/pages/ProjectsPage.tsx`

---

## Validation Checklist After Changes

### Frontend-only changes

Run:

```bash
cd frontend
npm run build
```

### Strapi/frontend integration changes

Run:

```bash
make up-front-cms
```

Then verify:

- `http://localhost:1337/admin`
- `http://localhost:5173/projects`
- `http://localhost:5173/cms/projects?populate=media&sort=date:desc`

### Chatbot/backend changes

Run:

```bash
make up-chatbot
```

Then verify:

- `http://localhost:8001/health`

If backend fails on startup, check whether the FAISS index files exist in `kb/`.

---

## Environment Variables

Documented in:

- `.env.example`

Main groups:

- Groq / chatbot
- KB / RAG
- Strapi / PostgreSQL

Important note:

- Strapi secrets must be present for the container to boot cleanly
- the frontend does not talk directly to PostgreSQL
- the frontend talks to Strapi, and Strapi talks to PostgreSQL

---

## Practical Rules For Future Agents

1. Treat Strapi as the source of truth for project cards.
2. Treat `portfolio.ts` and `i18n.ts` as the source of truth for static site copy.
3. Do not assume a frontend white page is caused by Strapi or PostgreSQL; check browser cache/extensions first.
4. If `ProjectsPage` is broken, test `/cms/projects?populate=media&sort=date:desc` before changing UI code.
5. If backend startup fails, check FAISS artifacts before debugging FastAPI logic.
6. Keep the `COMPOSE_BAKE=false` Compose pattern unless the local Docker environment is explicitly fixed.
7. When editing Strapi schema, update the frontend types and rendering path in the same change.
8. When a project is saved in Strapi but not visible in frontend, verify both:
   - `Public` role permissions
   - published status
