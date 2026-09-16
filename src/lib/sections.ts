// Types and helpers for the PageSection content model.
//
// A page is an ordered list of sections. Each section has a `type` that decides
// which component renders it, and an `items` JSON array for the repeating part
// (cards, stats, steps, FAQ rows). Storing items as JSON keeps the schema to one
// table — the same trick Plan.features already uses, since SQLite has no arrays.

/** The section types the renderer knows how to draw. */
export type SectionType =
  | "hero"
  | "image-text"
  | "text-columns"
  | "feature-grid"
  | "stats"
  | "steps"
  | "timeline"
  | "checklist"
  | "terms"
  | "video"
  | "faq"
  | "cta"
  | "richtext";

/** One repeating entry inside a section: a card, a stat, a step or an FAQ row. */
export type SectionItem = {
  /** lucide-react icon name — see src/lib/icons.ts. */
  icon?: string;
  /** Image path under /public. Rendered borderless, per the site's image rule. */
  image?: string;
  title: string;
  text?: string;
  /** stats only: the number to count up to, and what follows it. */
  value?: number;
  suffix?: string;
  prefix?: string;
  /**
   * A small label on the card — "Most chosen", "Best value". A card that has
   * one is also the emphasised card in its row.
   */
  badge?: string;
  /** Turns a card into a link. */
  href?: string;
};

/** A section row with `items` already parsed. */
export type SectionView = {
  id: number;
  type: SectionType;
  eyebrow: string | null;
  title: string | null;
  body: string | null;
  image: string | null;
  icon: string | null;
  tone: "default" | "muted" | "brand" | "plain";
  flip: boolean;
  ctaLabel: string | null;
  ctaHref: string | null;
  ctaLabel2: string | null;
  ctaHref2: string | null;
  video: string | null;
  items: SectionItem[];
};


/** The shape a PageSection row comes back as from Prisma. */
type SectionRow = {
  id: number;
  type: string;
  eyebrow: string | null;
  title: string | null;
  body: string | null;
  image: string | null;
  icon: string | null;
  tone: string | null;
  flip: boolean;
  ctaLabel: string | null;
  ctaHref: string | null;
  ctaLabel2: string | null;
  ctaHref2: string | null;
  items: string | null;
  video: string | null;

  // Somali twins. Null means "not translated yet" and falls back to English.
};

const SECTION_TYPES: SectionType[] = [
  "hero",
  "image-text",
  "text-columns",
  "feature-grid",
  "stats",
  "steps",
  "timeline",
  "checklist",
  "terms",
  "video",
  "faq",
  "cta",
  "richtext",
];

const TONES = ["default", "muted", "brand", "plain"] as const;

/** `items` is stored as a JSON string, so parse it defensively. */
export function parseItems(items: string | null | undefined): SectionItem[] {
  if (!items) return [];

  try {
    const parsed = JSON.parse(items);
    return Array.isArray(parsed) ? (parsed as SectionItem[]) : [];
  } catch {
    return [];
  }
}

/** Turns a database row into the shape the renderer wants, in one language. */
export function toSectionView(row: SectionRow): SectionView {
  const type = SECTION_TYPES.includes(row.type as SectionType)
    ? (row.type as SectionType)
    : "richtext"; // unknown types fall back to plain prose rather than vanishing

  const tone = TONES.includes(row.tone as (typeof TONES)[number])
    ? (row.tone as SectionView["tone"])
    : "default";

  // A partly translated section still renders: each field falls back on its own.
  const items = parseItems(row.items);

  return {
    ...row,
    type,
    tone,
    items,
    eyebrow: row.eyebrow,
    title: row.title,
    body: row.body,
    ctaLabel: row.ctaLabel,
    ctaLabel2: row.ctaLabel2,
  };
}
