# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contesto del Progetto

Questo progetto è un refactor del sito **albergoalgobbo.it** (<https://albergoalgobbo.it>).

L'obiettivo è ricreare il sito con la stack moderna del brochure-boilerplate 2026,
mantenedo i contenuti e l'identità visiva del sito originale.

Il sito originale viene usato come riferimento per:
- Estrarre contenuti (testi, media)
- Replicare l'identità aziendale (colori, font, tono di voce)

**Directory:** `website2026.albergoalgobbo.it`
**Sito di riferimento:** `https://albergoalgobbo.it`

## Monorepo

pnpm + Turbo monorepo con tre workspace dichiarati in `pnpm-workspace.yaml`:

- `packages/shared` — `@brochure/shared`: tipi, costanti e schemi Zod condivisi.
- `apps/backend` — `@brochure/backend`: API Hono.
- `apps/frontend` — `@brochure/frontend`: SPA React + Vite + i18n.

`apps/backend` e `apps/frontend` importano `@brochure/shared` via `workspace:*`.

## Comandi principali

Dalla root del repo:

```bash
pnpm install                 # installa tutti i workspace
pnpm dev                     # backend (tsx watch) + frontend (vite) in parallelo
pnpm build                   # builda shared → backend + frontend
pnpm lint                    # typecheck su tutti i workspace
pnpm clean                   # rimuove dist/, .turbo/, node_modules/
docker compose up --build    # stack produzione in locale
```

Comandi per singolo workspace:

```bash
pnpm --filter @brochure/shared build
pnpm --filter @brochure/shared dev       # tsc --watch
pnpm --filter @brochure/backend dev      # tsx watch src/index.ts
pnpm --filter @brochure/backend start    # node dist/index.js
pnpm --filter @brochure/frontend dev     # vite su http://localhost:3000
pnpm --filter @brochure/frontend build
pnpm --filter @brochure/frontend preview
```

## Sviluppo

- Il frontend gira su `http://localhost:3000` e proxya `/api` al backend su `http://localhost:3001`.
- Il backend carica `.env.local` dalla root del repo (due livelli sopra `apps/backend/src`).

## Architettura

### Backend (`apps/backend`)

- Entrypoint: `src/index.ts` — Hono + CORS + logger, carica env, monta le route.
- Route:
  - `GET  /api/health` — health check.

### Frontend (`apps/frontend`)

- Entrypoint: `src/main.tsx` → `App.tsx`.
- `BrowserRouter` + `LanguageRouter`: le route sono prefissate dalla lingua (`/it/...`, `/en/...`); la lingua viene rilevata dal path (`path` first in i18next detection).
- i18n: file in `public/locales/{it,en}/common.json`; lingue supportate `it` e `en`, default `it`.
- Alias `@` → `./src` configurato in `vite.config.ts`.

### Shared (`packages/shared`)

- `src/constants/api.ts` — `API_ROUTES`, porte default.

## Convenzioni

- TypeScript 5.7, ESM (`"type": "module"`), import con estensione `.js`.
- Backend buildato con `tsc` in `dist/`.
- Frontend buildato con Vite in `dist/`.
- Tailwind CSS 4 via `@tailwindcss/postcss`.
