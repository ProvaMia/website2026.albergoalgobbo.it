# Technologies — website2026.albergoalgobbo.it 2026

Stack tecnologico del boilerplate. Il progetto è strutturato come monorepo
pnpm + Turbo con tre workspace: `apps/backend`, `apps/frontend`, `packages/shared`.

## Monorepo tooling

| Tech | Version | Ruolo |
|---|---|---|
| **pnpm** | 10.33 | Package manager workspace-aware |
| **Turbo** | 2.9 | Task orchestrator (`dev`, `build`, `lint`, `clean`) con dipendenze `^build` |
| **TypeScript** | 5.7 | Configurato per ciascun workspace, nessun `composite`/`references` cross-workspace |

Workspace dichiarati in `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

## `packages/shared` — @brochure/shared

Libreria TypeScript condivisa tra backend e frontend. Compilata con `tsc`
(produce `dist/` con `.js` + `.d.ts`), importata via `workspace:*`.

| Tech | Ruolo |
|---|---|
| **Zod 3** | Schemi di validazione delle richieste/risposte API |

Contenuto:
- `src/constants/api.ts` — costanti condivise (`API_ROUTES`, porte default)

## `apps/backend` — @brochure/backend

API HTTP Hono.

| Tech | Version | Ruolo |
|---|---|---|
| **Hono** | 4 | Framework HTTP ultraleggero |
| **@hono/node-server** | 1 | Adapter Node.js per Hono |
| **dotenv** | 17 | Carica `.env.local` / `.env` dalla root del repo |
| **tsx** | 4 | Runner TypeScript per `pnpm dev` (watch mode) |

Struttura:

```
apps/backend/
├── src/
│   ├── index.ts           # Hono app + CORS + logger + serve()
│   ├── routes/
│   │   └── health.ts      # GET  /api/health
│   └── lib/
└── data/
```

## `apps/frontend` — @brochure/frontend

Single Page Application React.

| Tech | Version | Ruolo |
|---|---|---|
| **React** | 19 | UI library |
| **React Router DOM** | 7 | Routing SPA con prefisso lingua |
| **Vite** | 6 | Build tool + dev server con HMR |
| **@vitejs/plugin-react** | 4 | Plugin React per Vite |
| **TypeScript** | 5.7 | Type safety |
| **Tailwind CSS** | 4 | Utility-first CSS via `@tailwindcss/postcss` |
| **PostCSS** + **Autoprefixer** | — | Pipeline CSS |
| **tailwindcss-animate** | 1 | Animazioni predefinite |
| **tailwind-merge** + **clsx** | — | Composizione classi Tailwind |
| **Framer Motion** | 12 | Animazioni UI |
| **Lucide React** | — | Set di icone |
| **i18next** + **react-i18next** | 24 / 15 | Traduzioni IT/EN |
| **i18next-browser-languagedetector** | 8 | Rilevamento lingua via path |
| **i18next-http-backend** | 3 | Caricamento dinamico dei file locales |
| **@playwright/test** | 1 | E2E (predisposto, non ancora utilizzato) |
| **terser** | 5 | Minification build produzione |

Il dev server Vite usa un proxy `/api → http://localhost:3001` per inoltrare le
chiamate al backend.

Struttura principale:

```
apps/frontend/
├── index.html
├── public/locales/{it,en}/common.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── layout/Header.tsx
│   │   ├── LanguageRouter.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── LocalizedLink.tsx
│   │   └── CookieConsent.tsx
│   ├── contexts/                 # CookieConsentContext
│   ├── hooks/                    # useBackgroundContrast, useLocalizedNavigate
│   ├── i18n/                     # setup i18next + definizione rotte
│   └── lib/utils.ts
├── vite.config.ts                # proxy /api → :3001, alias @ → ./src
├── tailwind.config.js
└── postcss.config.js
```

## Containerizzazione

| Tech | Ruolo |
|---|---|
| **Docker** (multi-stage) | Build backend e frontend in immagini separate |
| **nginx** (alpine) | Serve la SPA produzione, proxy `/api/` → `backend:3001`, SPA fallback |
| **Docker Compose** | Orchestrazione locale dei due servizi su rete bridge `brochure` |

`docker/Dockerfile.backend` usa `pnpm --prod --legacy deploy` per produrre un
bundle autosufficiente; `docker/Dockerfile.frontend` builda la SPA e serve
`dist/` da nginx.

## Comandi principali

Dalla root del repo:

```bash
pnpm install               # Installa tutti i workspace
pnpm dev                   # Turbo: backend (tsx watch) + frontend (vite) in parallelo
pnpm build                 # Turbo: shared → backend + frontend
pnpm lint                  # Turbo: typecheck su tutti i workspace
pnpm clean                 # Rimuove dist/, .turbo/, node_modules/

docker compose up --build  # Stack produzione in locale
```

Per workspace singolo:

```bash
pnpm --filter @brochure/shared build
pnpm --filter @brochure/backend dev
pnpm --filter @brochure/frontend dev
```

## Prerequisiti

- Node.js ≥ 20
- pnpm ≥ 10 (`corepack enable` è sufficiente)
- Docker + Docker Compose (solo per run containerizzato)
