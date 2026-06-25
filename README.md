# Portfolio Panel

Admin dashboard for managing portfolio content — projects and testimonials — backed by a REST API.

## Features

- **Landing page** — public marketing entry with sign-in CTA
- **Single-user auth** — password login via Vercel serverless functions and httpOnly JWT cookie
- **Dashboard** — project and testimonial counts with analytics placeholder
- **Projects** — list, create, edit, and delete portfolio projects via a 4-step form (basics, story, tech & media, SEO & links)
- **Testimonials** — create, edit, and delete client testimonials in a slide-over sheet
- **Image uploads** — cover and gallery images uploaded to [ImgBB](https://imgbb.com/)
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
   | `VITE_PUBLIC_IMGBB_KEY` | Client | ImgBB API key for uploading project and testimonial images |
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
├── pages/                  # Landing, login, dashboard, projects, testimonials
├── components/
│   ├── auth/               # Protected route wrapper
│   ├── landing/            # Public landing page
│   ├── layout/             # Dashboard shell, sidebar, navbar
│   ├── project/            # Project cards and multistep form
│   ├── testimonial/        # Testimonial cards and sheet form
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
| `/dashboard/testimonials` | Protected | Testimonial list and management |

## Deployment

The app is configured for [Vercel](https://vercel.com/) with SPA rewrites in `vercel.json`. API routes under `/api/auth/*` are deployed as serverless functions.

Set all environment variables in your Vercel project settings before deploying:

- `VITE_BASE_API_URL`
- `VITE_PUBLIC_IMGBB_KEY`
- `ADMIN_PASSWORD`
- `AUTH_SECRET`

## License

[MIT](LICENSE)
