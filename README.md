# Innobi OpsCore

Premium neon‑glass ERP dashboard built with React, TypeScript, Vite, Tailwind, and Supabase.  
Developed by **Innobi** (Salih Sezen) — Web Site: [innobi.site](https://innobi.site)

## Live
- **Live site:** https://opscore.innobi.site

## System Architecture (Frontend‑first)
- **UI:** React 18 + TypeScript, Vite bundler.
- **Styling:** Tailwind CSS with glass/neon accents and neumorphic controls; Radix UI primitives; `tailwind-merge`, `cva` utilities.
- **Routing:** React Router v6.
- **Data:** Supabase client (`@supabase/supabase-js`) for CRUD/dashboard stats.
- **Forms & validation:** `react-hook-form` + `zod`.
- **Charts:** Recharts for KPIs and visualizations.
- **UX details:** Collapsible neon sidebar, animated theme art, custom glass/neumorphic toggle, responsive header and welcome pill.

## Features
- Dashboard KPIs, charts, and project/revenue status.
- Modules: Customers, Projects, Vendors, Employees, Purchase Orders, Invoices.
- Layout: collapsible sidebar, responsive header, theme-aware glass/neumorphic UI.
- Theming: light/dark via ThemeProvider; palette-aligned icons and cards.

## Project Structure (high level)
- `src/components/layout/` — Header, Sidebar, app shell.
- `src/components/dashboard/` — KPI cards and dashboard components.
- `src/components/ui/` — Theme provider/toggle and shared UI pieces.
- `src/pages/` — Route-level pages for each module and dashboard.
- `src/hooks/` — Data hooks (Supabase-backed, etc.).
- `src/types/` — Shared TypeScript types (including Supabase).
- `src/img/` — Branding, light/dark art, avatars, favicon/logo.

## Getting Started (local)
1) **Install deps:** `npm install`
2) **Env config:** copy `.env.example` to `.env.local` (or `.env`) and set:
   - `VITE_SUPABASE_URL=YOUR_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY`
3) **Run dev server:** `npm run dev`
4) **Build:** `npm run build`
5) **Preview prod build:** `npm run preview`

## Supabase Types
- From Supabase Dashboard → Code → TypeScript, copy generated types into `src/types/supabase.ts` (replace the placeholder `Database` type).

## NPM Scripts
- `npm run dev` — Start Vite dev server.
- `npm run build` — Type-check and build for production.
- `npm run build:prod` — Build with `BUILD_MODE=prod`.
- `npm run preview` — Preview the production build.
- `npm run lint` — ESLint across the repo.
- `npm run deploy` — Publish `dist` via `gh-pages` (after `npm run build`).

## Design Notes
- Neon-glass panels, soft shadows, and neumorphic toggles.
- ON state toggle: pastel green (#8EE6C8), inset glow, radial center highlight, soft shadows.
- OFF state toggle: cold grey gradient (#E6ECF6 → #C7CEDB), ambient glow, soft inset highlight.
- Sidebar icons align with KPI palette; welcome pill adapts to light/dark.

## Author / Contact
- Built by **Innobi** (Salih Sezen).  
- Web: [innobi.site](https://innobi.site)
