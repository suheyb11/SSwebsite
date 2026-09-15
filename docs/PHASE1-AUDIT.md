# Phase 1 — Audit & Proposed Prisma Schema

## 1. Page inventory (21 routes — all must survive the migration)

| Current file | Route | Data source | Notes |
|---|---|---|---|
| `pages/index.js` (552 ln) | `/` | hardcoded JSX | Slider + Service + product grid + 5 business services + 3 pricing cards + client reviews + newsletter |
| `pages/about.js` (524) | `/about` | hardcoded | Vision/Mission, Who we are, Why choose us, Core values (5), Partners (6 logos), CTA |
| `pages/Career.js` (478) | `/Career` | **Strapi `careers`** | Search + location/department filters + job modal, `mailto:` apply |
| `pages/contact-us.js` (156) | `/contact-us` | hardcoded | Formspree form (`myyleorq`) + Google Map iframe |
| `pages/blog/index.js` | `/blog` | **Strapi `blogs`** | SSR, paginated 6/page, sidebar (search + about widget) |
| `pages/blog/[slug]/index.js` | `/blog/[id]` | **Strapi `blogs`** | ISR 60s, detail + social share + categories |
| `pages/Prepaid.js` (388) | `/Prepaid` | `plan.json` (Akram) | 3 plan cards, DID Call section |
| `pages/Postpaid.js` (512) | `/Postpaid` | hardcoded | + Terms & Conditions |
| `pages/Muraadso.js` (289) | `/Muraadso` | `plan.json` (muradso, dhameysPlus) | Video hero, 3 FAQs |
| `pages/Akram.js` (276) | `/Akram` | `plan.json` (Akram) | 4 FAQs, **no breadcrumb** |
| `pages/Dhameys.js` (307) | `/Dhameys` | `plan.json` (dhameysPlus) | 3 FAQs |
| `pages/Kaafiye.js` (210) | `/Kaafiye` | hardcoded pricing | 3 FAQs |
| `pages/Mifi.js` (183) | `/Mifi` | hardcoded | 3 FAQs |
| `pages/Esim.js` (307) | `/Esim` | hardcoded | 3 FAQs |
| `pages/Roaming.js` (273) | `/Roaming` | hardcoded | 3 FAQs |
| `pages/eDahab.js` (412) | `/eDahab` | hardcoded | 4 FAQs |
| `pages/Keydso.js` (332) | `/Keydso` | hardcoded | 4 FAQs |
| `pages/fiberoptic.js` (712) | `/fiberoptic` | hardcoded | 6 services, 3 pricing tiers, 3 FAQs — largest page |
| `pages/SMS.js` (290) | `/SMS` | hardcoded | 6 FAQs |
| `pages/SMSAPI.js` (246) | `/SMSAPI` | hardcoded | 5 FAQs |
| `pages/IVR.js` (177) | `/IVR` | hardcoded | 3 FAQs |
| `pages/404.js` | 404 | — | |

## 2. Components

- `layout/Layout.js` — Head, jQuery/owl bootstrapping, Header + Footer wrapper
- `layout/Header.js` (277) — desktop mega-menu (hover, 4 columns) + inline mobile drawer + WhatsApp CTA
- `layout/Footer.js` (161) — 4 columns, socials, contact info, **18 legacy `<Script>` tags**, Botpress chat widget
- `layout/slider.js` (342) — owl.carousel hero, **4 slides** (Superfast Broadband / Talk More Less Pay / eDahab Services / Stay Connected Everywhere)
- `layout/service.js` (116) — "SOMTEL - SOMALIA TELECOMMUNICATION NETWORK" about block
- `layout/client.js` (155) — testimonial carousel, **2 real testimonials** (Shabelle Group, Signjet)
- `layout/blogCard.js`, `blogDetailCard.js`, `BlogSocialMediaShare.js`, `ContainerCenterFit.js`
- `layout/MobileMenu.js` — **dead code**: reads `mi.title` but `menuItems` exposes `label`; not imported anywhere
- `data/menuItems.js` — full nav tree (4 duplicate blank "Home" entries at the top — a bug)
- `hooks/useScrollPosition.js`, `hooks/useWindowSize.js`
- `constants/uiConfig.js`, `lib/arrayCeil.js` (unused), `jsStyles/burger.js`

## 3. Strapi content types in use (only two)

**`blogs`** — `http://websiteapi.somtelsomalia.net/api/blogs?populate=*`
Fields consumed: `Title`, `Description` (rich-text blocks), `img.url`, `postedDate`, `publishedAt`, `documentId`/`id`, `categories[].name`

**`careers`** — `http://websiteapi.somtelsomalia.net/api/careers?populate=*`
Fields consumed: `title`, `type`, `location.name`, `department.name`, `deadline`, `satuation` (value `'Opened'`), `detail` (rich-text blocks), `id`

Everything else on the site is hardcoded JSX or `plan.json`.

## 4. Problems found (worth fixing during migration)

1. **Blog detail and all blog images point at `http://10.97.1.17:1337`** — a private LAN IP hardcoded in `blog/[slug]/index.js`, `blogCard.js`, `blogDetailCard.js`. Almost certainly broken in production. The list page uses a different host than the detail page.
2. **Footer links are case-wrong**: `/kaafiye` but the page is `/Kaafiye`; `/Ivr` but the page is `/IVR`. Works on Windows, 404s on a case-sensitive host.
3. **Newsletter form is non-functional** — no `action`, no handler, and the submit button has an empty label.
4. **`public/assets` is 198 MB**, plus a duplicated `public/assets - Copy` (19 MB) — legacy theme bundle (Bootstrap, owl, nivo, meanmenu, venobox, wow.js, isotope, waypoints).
5. **Tailwind's palette is unused.** Config defines `primary #29abe3` / `secondary #4068c8`, but the site actually renders `#1f2f5e` (navy) 597x and `#fed900` (yellow) 98x. Tailwind brand classes appear 3x in total.
6. Unused dependencies: `axios`, `hcaptcha`, `@hcaptcha/react-hcaptcha`, `react-hook-form`, `@hookform/resolvers`, `react-scroll`, `react-spinners`, `react-uuid`, `next-sitemap`, `@next/font`.
7. `menuItems.js` has 4 duplicate blank entries before the real "Home".
8. `server.js` contains dead `/a` and `/b` route branches.

## 5. Brand decision needed

The real brand is navy `#1f2f5e` + yellow `#fed900`. The Tailwind config's blues are aspirational, not used.

**Proposal:** make navy/yellow the primary/accent tokens, keeping the existing `#29abe3` cyan ramp as a supporting tint. Nothing on screen changes identity.

## 6. Proposed Prisma schema

```prisma
datasource db { provider = "sqlite"  url = env("DATABASE_URL") }
generator client { provider = "prisma-client-js" }

// ---------- Blog (replaces Strapi `blogs`) ----------
model Post {
  id          Int       @id @default(autoincrement())
  slug        String    @unique          // real slug, replaces Strapi documentId
  title       String
  excerpt     String?
  body        String                     // markdown, replaces rich-text blocks
  imageUrl    String?                    // local /assets path, no more 10.97.1.17
  author      String    @default("Somtel")
  postedDate  DateTime  @default(now())
  published   Boolean   @default(true)
  categories  Category[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  slug  String @unique
  posts Post[]
}

// ---------- Careers (replaces Strapi `careers`) ----------
model Job {
  id           Int       @id @default(autoincrement())
  slug         String    @unique
  title        String
  type         String?                  // Full-time / Contract
  location     String?                  // flattened from location.name
  department   String?                  // flattened from department.name
  detail       String                   // markdown
  deadline     DateTime?
  status       String    @default("Opened")   // was the misspelled `satuation`
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  applications JobApplication[]
}

model JobApplication {
  id        Int      @id @default(autoincrement())
  jobId     Int
  job       Job      @relation(fields: [jobId], references: [id], onDelete: Cascade)
  name      String
  email     String
  phone     String?
  message   String?
  createdAt DateTime @default(now())
}

// ---------- Product / marketing content (was hardcoded JSX) ----------
model Product {
  id          Int      @id @default(autoincrement())
  slug        String   @unique      // prepaid, postpaid, muraadso, akram, dhameys,
                                    // kaafiye, mifi, esim, roaming, edahab, keydso,
                                    // fiberoptic, sms, smsapi, ivr
  name        String
  category    String                // "personal" | "business"
  tagline     String?
  heroTitle   String?
  heroText    String?
  heroImage   String?
  body        String?               // markdown for the page's prose sections
  order       Int      @default(0)
  plans       Plan[]
  faqs        Faq[]
}

model Plan {                        // replaces plan.json + hardcoded pricing cards
  id        Int     @id @default(autoincrement())
  productId Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  title     String
  price     Float
  unit      String?                 // "month" | "Day" | "Weekly" | ""
  features  String                  // JSON array of strings (SQLite has no String[])
  highlight Boolean @default(false)
  order     Int     @default(0)
}

model Faq {                         // 49 FAQs across 14 pages today
  id        Int      @id @default(autoincrement())
  productId Int?
  product   Product? @relation(fields: [productId], references: [id], onDelete: Cascade)
  question  String
  answer    String
  order     Int      @default(0)
}

// ---------- Home page content ----------
model Slide {                       // 4 hero slides from slider.js
  id        Int     @id @default(autoincrement())
  title     String
  subtitle  String?
  text      String?
  imageUrl  String?
  ctaLabel  String?
  ctaHref   String?
  order     Int     @default(0)
  active    Boolean @default(true)
}

model Testimonial {                 // 2 real testimonials from client.js
  id       Int     @id @default(autoincrement())
  name     String
  position String?
  quote    String
  imageUrl String?
  order    Int     @default(0)
}

model Partner {                     // 6 logos on /about
  id      Int     @id @default(autoincrement())
  name    String
  logoUrl String
  href    String?
  order   Int     @default(0)
}

// ---------- Forms ----------
model ContactMessage {              // replaces Formspree
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
  handled   Boolean  @default(false)
}

model Subscriber {                  // makes the dead newsletter form work
  id        Int      @id @default(autoincrement())
  email     String   @unique
  createdAt DateTime @default(now())
}

// ---------- Site-wide ----------
model Setting {                     // phone, email, address, socials, WhatsApp number
  key   String @id
  value String
}
```

### Route handlers this implies

```
/api/posts               GET (paginated) - POST
/api/posts/[slug]        GET - PUT - DELETE
/api/jobs                GET (search/location/department filters) - POST
/api/jobs/[slug]         GET - PUT - DELETE
/api/jobs/[slug]/apply   POST
/api/products            GET
/api/products/[slug]     GET
/api/contact             POST
/api/subscribe           POST
/api/settings            GET
```

Server Components read Prisma directly for the initial render; these handlers serve forms and client-side filtering (the Career page's live search).

---

## Migration notes (added during Phases 2–3)

Three environment problems surfaced once App Router files existed. All are fixed:

1. **`jsconfig.json` overrode `tsconfig.json`.** It set `baseUrl: "src"`, which made
   Next ignore the TypeScript `paths` config, so every `@/...` import failed to
   resolve. Deleted — `tsconfig.json` is now the single source of truth.
2. **TypeScript 7 was installed transitively** (via Prisma) and TS 7 removed
   `baseUrl` outright. Pinned `typescript@5` as a real devDependency.
3. **React 18 could not type async Server Components.** `<Footer />` is an async
   component, which React 18's JSX types reject. Upgraded to React 19 (+ matching
   `@types`), which Next 15 supports and which App Router assumes.

Also: `src/components/layout/MobileMenu.js` (the dead file noted above) had to be
deleted rather than merely ignored — on Windows' case-insensitive module
resolution it shadowed the new `MobileMenu.tsx`.

The old Pages Router lives in `legacy/` (gitignored) for reference during the
migration; the originals remain in git history.

## Migration complete (Phases 4–7)

### Route coverage

Every route from the old Pages Router site exists in the App Router build:

| Old route | New location |
| --- | --- |
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/contact-us` | `src/app/contact-us/page.tsx` |
| `/blog`, `/blog/[slug]` | `src/app/blog/` |
| `/Career` | `src/app/Career/page.tsx` + `Career/[slug]` (new detail page) |
| The 15 product pages | `src/app/[slug]/page.tsx`, driven by the `Product` table |
| `/404` | `src/app/not-found.tsx` |

The 15 product pages were separate files with near-identical structure (hero, pricing,
FAQ). They now share one template and differ only by their database row.

### Additions

- `/Career/[slug]` — the old site opened a modal and sent applicants to a `mailto:` link.
  Each job now has its own page with an application form that saves to the database.
- `/api/*` — ten Route Handlers replacing the two Strapi-backed Pages API routes.

### Content fidelity

All FAQ copy on `Muraadso`, `Dhameys`, `Kaafiye`, `Mifi`, `Esim`, `Keydso`, `SMSAPI`
and `IVR` is the verbatim text from the original pages, restored into `prisma/seed.ts`.
The remaining products had no FAQ section on the old site; theirs is newly written.

`/assets/images/slider/somtel-ivr.png` was referenced by the old IVR page but does not
exist in `public/`. The IVR hero now uses `/assets/images/empowering.jpg`, which the same
page already used further down.

### Dependencies removed

`jquery`, `owl.carousel`, `react-owl-carousel`, `react-burger-menu`, `nextjs-progressbar`,
`react-scroll`, `axios`, `hcaptcha`, `@hcaptcha/react-hcaptcha`, `react-hook-form`,
`@hookform/resolvers`, `react-spinners`, `react-uuid`, `next-sitemap`, `@next/font`,
`lodash`, `react-cool-dimensions`, `react-icons`, `sass`.

Six runtime dependencies remain: `next`, `react`, `react-dom`, `@prisma/client`,
`framer-motion`, `lucide-react`. Everything else moved to `devDependencies`.

`STRAPI_API_TOKEN` was removed from `.env`; `DATABASE_URL` is now the only variable.

### Verification

`npm run lint`, `npm run build` and `npm run dev` all complete with no warnings or errors.
The build prerenders 36 routes. Every page and every API route was checked against a
running server.
