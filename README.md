# Origin Store

Monorepo for a new Origin-inspired e-commerce foundation. This first pass implements only the Home page.

## Structure

```text
origin-store
├── frontend  # Next.js App Router, TypeScript, Tailwind, Framer Motion
└── backend   # Express, TypeScript, Prisma, PostgreSQL/Neon
```

## Install

```bash
npm install
```

## Configure Environment

Copy the examples:

```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env.local
```

Set `DATABASE_URL` in `backend/.env` to your real Neon PostgreSQL connection string before running migrations or seed. Do not place the database URL in frontend environment files.

The API includes a temporary fallback product dataset so the Home page can render before Neon is configured. If `backend/.env` still contains the example `HOST.neon.tech` value, the API intentionally uses fallback products.

## Prisma

```bash
npm run prisma:generate --workspace backend
npm run prisma:migrate --workspace backend
npm run seed --workspace backend
```

Only run `prisma:migrate` and `seed` after replacing the example `DATABASE_URL` with a real Neon connection string.

## Run Locally

Start the backend:

```bash
npm run dev --workspace backend
```

Start the frontend:

```bash
npm run dev --workspace frontend
```

Run those in two separate terminals. The backend dev server watches continuously, so commands typed after it in the same PowerShell session will not run until the backend process is stopped.

Or start both from the root:

```bash
npm run dev
```

Defaults:

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run build
```
