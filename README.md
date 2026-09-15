# Somtel Somalia — Website

The Somtel Somalia marketing site: Next.js 15 (App Router) + TypeScript, styled with
Tailwind CSS and animated with Framer Motion. Content lives in a local SQLite database
managed by Prisma — there is no external CMS.

## Requirements

- Node.js 18.18 or newer
- npm

## Getting started

```bash
npm install          # install dependencies
cp .env.example .env # DATABASE_URL is the only variable the site needs
npm run db:push      # create the SQLite database from prisma/schema.prisma
npm run db:seed      # fill it with the site content
npm run dev          # http://localhost:3000
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Generates the Prisma client, then builds for production |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint via `next lint` |
| `npm run db:push` | Applies `prisma/schema.prisma` to the database |
| `npm run db:seed` | Re-seeds all content (clears existing rows first) |
| `npm run db:studio` | Opens Prisma Studio to browse and edit content |

## Project structure

```
prisma/
  schema.prisma        Database models
  seed.ts              All site content — edit here, then `npm run db:seed`
src/
  app/                 App Router pages and API route handlers
    [slug]/            One template serving all 15 product pages
    Career/            Job board and job detail
    blog/              Blog list and blog detail
    api/               Route handlers, all returning { data, error }
  components/
    layout/            Navbar, Footer, mobile menu, theme toggle
    sections/          Page sections (hero, pricing, FAQ, forms, job board)
    ui/                Small shared building blocks
    motion/            Framer Motion wrappers used across the site
  lib/
    db.ts              Prisma client + getSettings()
    api.ts             Shared helpers for route handlers
    content.ts         Date formatting and the small markdown renderer
    navigation.ts      Menu and footer links
  types/index.ts       Shared TypeScript types
legacy/                The previous Pages Router site, kept for reference (not built, not committed)
```

Server Components read from Prisma directly. The `/api` routes exist for client-side
interactions — the contact form, newsletter signup and job applications.

## Editing content

Almost everything on the site (products, plans, FAQs, blog posts, jobs, slides,
testimonials, partners, phone numbers and social links) comes from the database.

- For a one-off change, run `npm run db:studio` and edit the row.
- For changes that should survive a re-seed, edit `prisma/seed.ts` and run `npm run db:seed`.

## Deployment

The site runs as a normal Node process behind the existing IIS reverse proxy.

```bash
npm ci
npm run build
NODE_ENV=production node server.js   # or: npm start
```

`server.js` listens on `process.env.PORT`, defaulting to 3000.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | SQLite connection string, e.g. `file:./dev.db` |

`.env` is git-ignored. `.env.example` shows the expected shape.
