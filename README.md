# Portfolio Panel

Admin dashboard for managing portfolio content — projects and testimonials — backed by a REST API.

## Features

- **Dashboard** — overview counts for projects and testimonials
- **Projects** — list, create, edit, and delete portfolio projects via a 4-step form (basics, story & content, tech & media, SEO & links)
- **Testimonials** — create, edit, and delete client testimonials
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

   | Variable | Description |
   | --- | --- |
   | `VITE_BASE_API_URL` | Base URL of the portfolio API (e.g. `https://api.example.com`) |
   | `VITE_PUBLIC_IMGBB_KEY` | ImgBB API key for uploading project and testimonial images |

3. **Generate API client** (optional, if the backend schema has changed)

   ```bash
   bun run generate:api
   ```

   This reads the OpenAPI schema from `VITE_BASE_API_URL/openapi.json` and regenerates `src/store/services/apis.ts`.

4. **Start the dev server**

   ```bash
   bun run dev
   ```

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start Vite dev server |
| `bun run build` | Type-check and build for production |
| `bun run preview` | Preview the production build locally |
| `bun run typecheck` | Run TypeScript without emitting files |
| `bun run lint` | Lint and auto-fix with Biome |
| `bun run format` | Format code with Biome |
| `bun run generate:api` | Regenerate RTK Query hooks from OpenAPI |

## Project Structure

```
src/
├── app.tsx                 # Route definitions
├── pages/                  # Dashboard, projects, testimonials
├── components/
│   ├── layout/             # Shell and navbar
│   ├── project/            # Project cards and multistep form
│   ├── testimonial/        # Testimonial cards and sheet form
│   └── ui/                 # shadcn/ui primitives
├── store/
│   └── services/
│       ├── core.ts         # RTK Query API base
│       └── apis.ts         # Generated API endpoints and hooks
└── lib/                    # Form schemas, constants, utilities
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Dashboard |
| `/projects` | Project list |
| `/projects/new` | Create project |
| `/projects/:id` | Edit project |
| `/testimonials` | Testimonial list and management |

## Deployment

The app is configured for [Vercel](https://vercel.com/) with SPA rewrites in `vercel.json`. Set the same environment variables in your Vercel project settings before deploying.

## License

[MIT](LICENSE)
