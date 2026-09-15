# Refinement Pass 2 — outline cards, borderless images, content, pages

## Route audit (44 prerendered routes)

| Route | Source | Status after this pass |
| --- | --- | --- |
| `/` | `Slide`, `Product`, `Plan`, `Testimonial`, `Partner` | Modern. Closing CTA added. |
| `/about` | `Partner` + page copy | Modern. Closing CTA added. |
| `/coverage` | `CoverageArea` | Modern. CTA moved to the shared band. |
| `/support` (Help Center) | site-wide `Faq` grouped by topic | Modern. CTA moved to the shared band. |
| `/contact-us` | `Setting`, `Feature` | **Rebuilt**: channel grid, opening hours, map, closing CTA. |
| `/Career` | `Job`, `Feature` | **Rebuilt**: intro + stats, benefits, job board, hiring steps, speculative CV, CTA. |
| `/Career/[slug]` | `Job` + `ApplyForm` | Modern, application form saves to the DB. |
| `/blog`, `/blog/[slug]` | `Post`, `Category` | Closing CTA added. |
| `/legal/[slug]` | `Page` | Privacy Policy + Terms, "last updated" line, CTA. |
| `/[slug]` (19 products) | `Product`, `Plan`, `Faq` | One template: hero, highlights, markdown body, pricing, FAQ, CTA. |
| `/_not-found` | — | Popular-links grid added. |
| `/api/*` (10 handlers) | — | Unchanged. |

### Standard telecom pages — all present

Coverage/Network (`/coverage`), Home Internet (`/home-internet`), Mobile plans and
bundles (`/bundles`, `/Prepaid`, `/Postpaid`), Roaming (`/Roaming`), Devices
(`/devices`), Business/Enterprise (`/business`, `/fiberoptic`), Support
(`/support`), About (`/about`), Legal (`/legal/privacy-policy`,
`/legal/terms-of-service`), Blog and Careers. Every one is wired into
`src/lib/navigation.ts` (navbar + footer) and carries its own `title` and
`description`.

## Cards — outline style

`.surface` in `globals.css` is the single definition: `rounded-2xl`, a 1px
`border-border` hairline, and a transparent fill. Hover strengthens the border to
`border-border-strong`, adds a faint navy tint (yellow glow in dark) and lifts.
Used by `Card`, `PricingCards`, `FaqAccordion`, `JobBoard`, `BlogSidebar`, the
blog cards and the contact detail list — no filled card blocks remain.

In dark mode the hairline is pitched brighter than the page behind it
(`--border: 46 63 104`) with a clear step up on hover (`--border-strong: 66 88 138`),
so an outline card still reads as a card on a near-black background.

## Images — borderless and transparent

No image on the site sits in a bordered or filled container. Image classes are
limited to sizing, `object-cover` / `object-contain`, and rounded corners on
photos. Transparent PNGs (the coverage map, partner logos, the navbar and footer
logos) render straight onto the page background.

## Content

Long-form page copy lives in the database, not in components:

- `Product.body` — markdown for each of the 19 product pages
- `Faq` — product FAQs, plus site-wide Help Center FAQs grouped by `topic`
- `Page` — Privacy Policy and Terms of Service
- `CoverageArea` — one row per city, with the services live there
- `Feature` — **new in this pass**: the "icon + title + text" tiles used by the
  Careers page (benefits, hiring steps) and the Contact page (channels). `icon`
  holds a lucide name resolved by `src/lib/icons.ts`.

Six product pages that still had one-line bodies were expanded to full articles:
`Prepaid`, `Muraadso`, `Akram`, `Dhameys`, `Kaafiye`, `fiberoptic`, with extra
FAQs on five of them.

Anything that needs real Somtel data is marked with a `TODO:` comment in
`prisma/seed.ts` or in the page file — short codes, tariffs, SLA targets,
opening hours, HR figures and the legal review.

## Shared components added

- `src/components/sections/CtaBand.tsx` — the navy closing band, previously
  copy-pasted into five pages. Every page now ends on one.
- `src/components/sections/FeatureGrid.tsx` — renders a `Feature` group as
  outline cards.
- `src/lib/icons.ts` — icon-name lookup, so the seed can name an icon safely.

## How to run

```
npm run db:push    # applies the Feature model
npm run db:seed
npm run dev        # or: npm run build && npm run start
```

`npm run lint`, `npx tsc --noEmit` and `npm run build` are all clean; the build
prerenders 44 routes.
