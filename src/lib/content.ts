// Small helpers shared between server components and API routes.

import type { PlanView } from "@/types";

/** Plan.features is stored as a JSON string because SQLite has no array type. */
export function parseFeatures(features: string): string[] {
  try {
    const parsed = JSON.parse(features);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Turns a DB plan row into the shape the UI wants. */
export function toPlanView(plan: {
  id: number;
  title: string;
  price: number;
  unit: string | null;
  features: string;
  highlight: boolean;
}): PlanView {
  return { ...plan, features: parseFeatures(plan.features) };
}

/** Formats a date the way the old site did, e.g. "14 AUG, 2025". */
export function formatDate(date: Date | string) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `${day} ${month}, ${d.getFullYear()}`;
}

/** Date and time for comments, e.g. "14 Sep 2026 at 15:42". */
export function formatDateTime(date: Date | string) {
  const d = new Date(date);
  const day = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${day} at ${time}`;
}

/**
 * Rough minutes to read an article, at 200 words a minute — the figure most
 * publishers use. Always at least one, because "0 min read" reads as an error.
 */
export function readingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Initials for a comment avatar: "Faduma Ali" -> "FA". */
export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * An event's date, written the way a listing wants it.
 * One day reads "27 September 2026"; a run of days reads "27–29 September 2026",
 * collapsing the month and year when both ends share them.
 */
export function formatEventDate(startsAt: Date | string, endsAt?: Date | string | null) {
  const start = new Date(startsAt);
  const end = endsAt ? new Date(endsAt) : null;

  const full = (d: Date) =>
    d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  // An end time on the same day is a finish time, not a second date.
  if (!end || end.toDateString() === start.toDateString()) return full(start);

  const sameMonth =
    start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  return sameMonth ? `${start.getDate()}–${full(end)}` : `${full(start)} – ${full(end)}`;
}

/** The time of day, or "" when the event carries no meaningful time. */
export function formatEventTime(startsAt: Date | string, endsAt?: Date | string | null) {
  const start = new Date(startsAt);
  const end = endsAt ? new Date(endsAt) : null;
  const time = (d: Date) => d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  if (end && end.toDateString() === start.toDateString()) return `${time(start)} – ${time(end)}`;
  return time(start);
}

/** Longer date format used on job listings, e.g. "31 December 2026". */
export function formatLongDate(date: Date | string | null) {
  if (!date) return "No deadline";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * A deliberately small markdown renderer.
 * The seeded content only uses headings, bullets, bold and paragraphs,
 * so a full markdown library would be more dependency than we need.
 */
export type MarkdownBlock =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul"; items: string[] };

export function parseMarkdown(markdown: string | null | undefined): MarkdownBlock[] {
  if (!markdown) return [];

  const blocks: MarkdownBlock[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: "ul", items: listItems });
      listItems = [];
    }
  };

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();

    if (!line) {
      flushList();
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else if (line.startsWith("> ")) {
      flushList();
      blocks.push({ type: "quote", text: line.slice(2) });
    } else if (line.startsWith("### ")) {
      flushList();
      blocks.push({ type: "h3", text: line.slice(4) });
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "h2", text: line.slice(3) });
    } else {
      flushList();
      blocks.push({ type: "p", text: line });
    }
  }
  flushList();

  return blocks;
}

/** Turns a heading into a URL fragment: "Your choices" -> "your-choices". */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** The h2 headings of a markdown document, for building a table of contents. */
export function headingsOf(markdown: string | null | undefined) {
  return parseMarkdown(markdown)
    .filter((block): block is { type: "h2"; text: string } => block.type === "h2")
    .map((block) => ({ id: slugify(block.text), text: block.text }));
}

/**
 * Where a blog category points.
 *
 * Events have a page of their own — with dates, venues and an upcoming/past
 * split that a blog filter cannot show — so that one category hands over to it
 * instead of narrowing the post list. Every category link on the site goes
 * through here, so a tag on a card behaves like the tab at the top of the page.
 */
export const EVENTS_CATEGORY_SLUG = "events";

export function categoryHref(slug: string) {
  return slug === EVENTS_CATEGORY_SLUG ? "/events" : `/blog?category=${slug}`;
}

/** Midnight at the end of the given day. */
export function endOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Whether an event has been and gone.
 *
 * The rule, in one place because three pages ask it and they must agree: an
 * event is over once its own end has passed — its finish time when it has one,
 * otherwise the end of the day it took place. Splitting the events page on this
 * rather than on a flag means nobody has to move anything between the upcoming
 * and past lists by hand.
 */
export function isEventOver(
  event: { startsAt: Date; endsAt: Date | null },
  now: Date = new Date()
) {
  return (event.endsAt ?? endOfDay(event.startsAt)) < now;
}
