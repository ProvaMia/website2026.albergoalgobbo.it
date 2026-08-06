# website2026.albergoalgobbo.it

Monorepo (pnpm + Turbo) per siti brochure moderni: frontend React/Vite, backend Hono,
pacchetto condiviso per tipi e contratti API, containerizzazione Docker.

## Struttura

```
website2026.albergoalgobbo.it/
├── apps/
│   ├── backend/            # @brochure/backend — API Hono (chatbot RAG)
│   └── frontend/           # @brochure/frontend — SPA React + Vite + i18n
├── packages/
│   └── shared/             # @brochure/shared — types, costanti, schemi Zod
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── nginx.conf
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

I tre workspace sono indipendenti ma `@brochure/backend` e `@brochure/frontend`
importano i contratti API (tipi + schemi Zod) da `@brochure/shared` via
`workspace:*`.

## Quick start

```bash
# 1. Install
pnpm install

# 2. Configure environment
cp .env.example .env.local
# → compila OPENROUTER_API_KEY, COMPANY_NAME, COMPANY_DESCRIPTION, COMPANY_TOPICS

# 3. Dev (backend + frontend in parallelo via turbo)
pnpm dev
```

- Frontend: http://localhost:3000 (Vite, proxy `/api` → `http://localhost:3001`)
- Backend:  http://localhost:3001 (Hono)

## Script principali (root)

| Comando | Descrizione |
|---|---|
| `pnpm dev` | `turbo run dev` — avvia backend + frontend in watch |
| `pnpm build` | `turbo run build` — builda shared → backend → frontend |
| `pnpm lint` | Typecheck su tutti i workspace |
| `pnpm clean` | Pulisce `dist/`, `.turbo/`, `node_modules/` |

Script per singolo workspace:

```bash
pnpm --filter @brochure/shared build
pnpm --filter @brochure/backend dev
pnpm --filter @brochure/frontend dev
pnpm --filter @brochure/backend embeddings  # genera apps/backend/data/embeddings.json
```

## Chatbot RAG

Il backend espone `POST /api/chat` che implementa un chatbot RAG:

1. Scrivi la knowledge base in `docs/knowledge-base.md`.
2. Genera gli embeddings: `pnpm --filter @brochure/backend embeddings`.
   L'output finisce in `apps/backend/data/embeddings.json`.
3. Compila `COMPANY_NAME`, `COMPANY_DESCRIPTION`, `COMPANY_TOPICS` in `.env.local`.
4. Il chatbot appare come pulsante flottante sul frontend.

Flusso: query utente → embedding → cosine similarity → top-3 chunks → LLM
(OpenRouter). Vedi `docs/chatbot-tech.md`.

## Docker

Entrambi i servizi sono containerizzati con Dockerfile multi-stage:

```bash
# Build + run
docker compose up --build

# Frontend: http://localhost:3000 (nginx, proxy /api → backend:3001)
# Backend:  http://localhost:3001 (Hono, legge env da .env.local)
```

Il frontend è servito da nginx come static SPA con fallback `try_files`. Nginx
inoltra `/api/*` al container backend sulla rete compose `brochure`.

## Deploy su Vercel (solo frontend)

Il frontend può essere deployato su Vercel **senza il backend Hono**, usando una
Vercel Serverless Function (`apps/frontend/api/chat.js`) come sostituto.

### Setup Vercel

1. Crea un nuovo progetto su Vercel collegato al repo GitHub
2. Imposta **Root Directory** = `apps/frontend` nella dashboard (Project Settings → General)
3. Framework Preset: **Vite** (auto-detected)
4. Configura le variabili d'ambiente nella dashboard:
   `OPENROUTER_API_KEY`, `SITE_URL`, `COMPANY_NAME`, `COMPANY_DESCRIPTION`,
   `COMPANY_TOPICS`, `EMBEDDING_MODEL`, `LLM_MODEL`
5. Deploy — Vercel userà il `vercel.json` in `apps/frontend/`

### Come funziona

- `apps/frontend/vercel.json` configura:
  - `installCommand`: installa le dipendenze dalla root del monorepo (`cd ../.. && pnpm install`)
  - `buildCommand`: builda `shared` → `frontend` con comandi diretti
  - `rewrites`: SPA fallback (tutte le route → `index.html`)
  - `functions`: serverless function `api/chat.js` con 256MB e 30s timeout
- `apps/frontend/api/chat.js` è la serverless function RAG (equivalente del backend Hono)
- Gli embeddings vengono serviti come asset statici da `public/data/embeddings.json`

### Nota importante

Il `vercel.json` deve stare in `apps/frontend/` (il Root Directory), **non** nella
root del repo. Vercel legge il config solo dal Root Directory configurato.

## Stack

| Area | Tech |
|---|---|
| Package mgr | pnpm 10 |
| Orchestrator | Turbo 2 |
| Frontend | React 19, Vite 6, TypeScript 5.7, Tailwind CSS 4 |
| i18n | i18next (IT/EN, path-based) |
| Router | React Router 7 |
| Backend | Hono 4, @hono/node-server |
| Shared | Zod |
| AI | OpenRouter (embeddings + LLM) |
| Container | Docker multi-stage, nginx |

## Variabili d'ambiente

Copia `.env.example` in `.env.local`. Le variabili richieste sono documentate
nel file stesso.

## Prerequisiti

- Node.js 20+
- pnpm 10+ (`corepack enable` oppure `npm i -g pnpm`)
- Docker + Docker Compose (solo per run containerizzato)

## Licenza

Progetto privato.
