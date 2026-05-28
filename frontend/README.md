# Frontend

Portfolio multi-pages en **React + TypeScript + Tailwind** avec direction **pixel art rétro** et architecture branchée sur un backend séparé pour le chatbot.

## Pages

- `/` : hero + navigation vers les vues dédiées
- `/projects` : galerie projets
- `/about` : profil et direction visuelle
- `/contact` : page contact UI-only, isolée pour une future intégration backend
- `/chat` : assistant connecté au backend FastAPI

## Commandes

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Fichiers clés

- `src/data/portfolio.ts` : contenu placeholder éditable
- `src/layouts/AppShell.tsx` : layout partagé
- `src/pages/` : pages routées
- `Dockerfile` : build dev/prod du frontend
- `docker/nginx/default.conf` : reverse proxy prod, incluant `/api/chat`
