# Portfolio Panel

Admin dashboard for managing portfolio content — projects and clients — backed by a REST API.

## Features

- **Landing page** — public marketing entry with sign-in CTA
- **Single-user auth** — password login via Vercel serverless functions and httpOnly JWT cookie
- **Dashboard** — project and client counts with link to analytics
- **Analytics** — GA4 key event catalog, PostHog product analytics, and reporting shortcuts
- **Outreach** — LinkedIn optimization, directory listings, guest posts, client backlinks, Product Hunt checklists and templates
- **Projects** — list, create, edit, and delete portfolio projects via a 4-step form (basics, story, tech & media, SEO & links)
- **Clients** — create, edit, and delete clients (name, company, designation, testimonial, feedback, photo) in a slide-over sheet
- **Quick Link** — link or reassign existing projects to clients without the full project wizard
- **Project–client linking** — assign a client from the project basics step, or use Quick Link for existing projects
- **Image uploads** — cover, gallery, and client photos uploaded to [ImgBB](https://imgbb.com/)
- **Dark / light theme** — system-aware theme toggle
- **OpenAPI-driven API client** — RTK Query hooks generated from the backend OpenAPI schema

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (New York style)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [Biome](https://biomejs.dev/) for linting and formatting

## Prerequisites

- [Bun](https://bun.sh/) (package manager and runtime)
- A running portfolio API that exposes an OpenAPI schema at `/openapi.json`
- An [ImgBB API key](https://api.imgbb.com/) for image uploads

## Getting Started

1. **Clone and install dependencies**

   ```bash
   bun install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in the values:

   ```bash
   cp .env.example .env
   ```

   | Variable | Where | Description |
   | --- | --- | --- |
   | `VITE_BASE_API_URL` | Client | Base URL of the portfolio API (e.g. `https://pb.sv.mushoodhanif.com`) |
   | `VITE_PUBLIC_IMGBB_KEY` | Client | ImgBB API key for uploading project and client images |
   | `VITE_GA4_PROPERTY_URL` | Client | Optional direct link to your GA4 property |
   | `VITE_GSC_PROPERTY_URL` | Client | Optional link to Google Search Console |
   | `VITE_CLARITY_PROJECT_URL` | Client | Optional link to Microsoft Clarity project |
   | `VITE_POSTHOG_PROJECT_URL` | Client | Optional link to your PostHog project dashboard |
   | `ADMIN_PASSWORD` | Server | Single admin login password |
   | `AUTH_SECRET` | Server | JWT signing secret (32+ random characters) |

3. **Generate API client** (when the backend schema changes)

   ```bash
   bun run generate:api
   ```

   This reads the OpenAPI schema from `VITE_BASE_API_URL/openapi.json` and regenerates `src/store/services/apis.ts`.

4. **Start the dev server**

   ```bash
   bun run dev
   ```

   Auth API routes (`/api/auth/*`) are handled by a Vite dev middleware plugin. For full Vercel parity, use:

   ```bash
   bun run dev:full
   ```

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start Vite dev server (includes auth API middleware) |
| `bun run dev:full` | Start Vercel dev for full-stack local development |
| `bun run build` | Type-check and build for production |
| `bun run preview` | Preview the production build locally |
| `bun run typecheck` | Run TypeScript without emitting files |
| `bun run lint` | Lint and auto-fix with Biome |
| `bun run format` | Format code with Biome |
| `bun run generate:api` | Regenerate RTK Query hooks from OpenAPI |

## Project Structure

```
api/auth/                   # Vercel serverless auth handlers
src/
├── app.tsx                 # Route definitions
├── pages/                  # Landing, login, dashboard, projects, clients
├── components/
│   ├── auth/               # Protected route wrapper
│   ├── client/             # Client cards and sheet form
│   ├── landing/            # Public landing page
│   ├── layout/             # Dashboard shell, sidebar, navbar
│   ├── project/            # Project cards and multistep form
│   ├── skeleton/           # Loading skeletons
│   └── ui/                 # shadcn/ui primitives
├── store/
│   └── services/
│       ├── core.ts         # RTK Query API base
│       └── apis.ts         # Generated API endpoints and hooks
└── lib/                    # Form schemas, auth helpers, upload utilities
```

## Routes

| Path | Access | Page |
| --- | --- | --- |
| `/` | Public | Landing |
| `/login` | Public | Admin login |
| `/dashboard` | Protected | Dashboard overview |
| `/dashboard/projects` | Protected | Project list |
| `/dashboard/projects/new` | Protected | Create project |
| `/dashboard/projects/:id` | Protected | Edit project |
| `/dashboard/clients` | Protected | Client list and management |
| `/dashboard/analytics` | Protected | GA4 key events, PostHog, and reporting shortcuts |

## Deployment

The app is configured for [Vercel](https://vercel.com/) with SPA rewrites in `vercel.json`. API routes under `/api/auth/*` are deployed as serverless functions.

Set all environment variables in your Vercel project settings before deploying:

- `VITE_BASE_API_URL`
- `VITE_PUBLIC_IMGBB_KEY`
- `ADMIN_PASSWORD`
- `AUTH_SECRET`

## License

[MIT](LICENSE)
