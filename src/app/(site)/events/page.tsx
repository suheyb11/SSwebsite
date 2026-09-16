import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { db } from "@/lib/db";
import { formatEventDate, formatEventTime, isEventOver } from "@/lib/content";
import { PageHeader, Section, SectionTitle, cx } from "@/components/ui";
import { FadeIn, HoverLift, Stagger, StaggerItem } from "@/components/motion";
import Illustration, { illustrationForEvent } from "@/components/ui/Illustration";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Somtel launches, roadshows and community days — what is coming up, and what has already happened.",
};

/** Events change as their date passes, so nothing here can be pre-rendered. */
export const dynamic = "force-dynamic";

type EventRow = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  imageUrl: string | null;
  venue: string | null;
  city: string | null;
  startsAt: Date;
  endsAt: Date | null;
};

export default async function EventsPage() {
  const now = new Date();

  const events = await db.event.findMany({
    where: { published: true },
    orderBy: { startsAt: "asc" },
  });

  const upcoming = events.filter((event) => !isEventOver(event, now));
  const past = events.filter((event) => isEventOver(event, now)).reverse();

  const featured = upcoming.find((event) => event.slug && upcoming.length > 0) ?? null;
  const rest = featured ? upcoming.filter((event) => event.id !== featured.id) : upcoming;

  return (
    <>
      <PageHeader
        title="Events"
        description="Launches, roadshows and community days across the Somali region. Come and meet the people who run the network."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />

      <Section>
        {upcoming.length === 0 ? (
          <div className="rounded-2xl border border-border-strong bg-white p-12 text-center">
            <CalendarDays size={28} className="mx-auto text-primary-300" aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold text-fg">Nothing scheduled right now</p>
            <p className="mt-2 text-muted">
              New dates are announced here first. Past events are below.
            </p>
          </div>
        ) : (
          <>
            <SectionTitle
              eyebrow="Coming up"
              title={upcoming.length === 1 ? "The next event" : "What is coming up"}
              description="Free to attend unless a ticket link says otherwise."
              align="left"
            />

            {featured && <FeaturedEvent event={featured} />}

            {rest.length > 0 && (
              <Stagger className={cx("grid gap-6 sm:grid-cols-2", featured ? "mt-6" : "mt-10")}>
                {rest.map((event) => (
                  <StaggerItem key={event.id}>
                    <HoverLift className="h-full">
                      <EventCard event={event} />
                    </HoverLift>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </>
        )}
      </Section>

      {past.length > 0 && (
        <Section tone="muted">
          <SectionTitle
            eyebrow="Already happened"
            title="Past events"
            description="A record of where we have been and what came of it."
            align="left"
          />

          <div className="mt-10 overflow-hidden rounded-2xl border border-border-strong bg-white">
            <ul className="divide-y divide-border">
              {past.map((event) => (
                <li key={event.id}>
                  <Link
                    href={`/events/${event.slug}`}
                    className="flex flex-col gap-2 px-5 py-5 transition-colors hover:bg-primary-50/40 sm:flex-row sm:items-center sm:gap-6 sm:px-6"
                  >
                    <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-muted sm:w-52">
                      <CalendarDays size={15} className="shrink-0" aria-hidden="true" />
                      {formatEventDate(event.startsAt, event.endsAt)}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-fg">{event.title}</span>
                      {event.summary && (
                        <span className="mt-1 block line-clamp-2 text-sm text-muted">
                          {event.summary}
                        </span>
                      )}
                    </span>

                    {event.city && (
                      <span className="shrink-0 text-sm text-muted sm:text-right">{event.city}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <CtaBand
        tone="light"
        title="Want us at your event?"
        text="We bring the network team, the device clinic and the eDahab desk to community days, campuses and trade fairs."
        primary={{ label: "Talk to our team", href: "/contact-us" }}
        secondary={{ label: "Read the blog", href: "/blog" }}
      />
    </>
  );
}

/** Day and month in a block, so a row of events scans by date. */
function DateBadge({ date, large = false }: { date: Date; large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "flex shrink-0 flex-col items-center justify-center rounded-xl bg-accent-500 text-primary-700",
        large ? "h-20 w-20" : "h-16 w-16"
      )}
    >
      <span className={cx("font-semibold leading-none", large ? "text-3xl" : "text-2xl")}>
        {date.getDate()}
      </span>
      <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-wide">
        {date.toLocaleDateString("en-GB", { month: "short" })}
      </span>
    </span>
  );
}

function FeaturedEvent({ event }: { event: EventRow }) {
  return (
    <FadeIn>
      <article className="group mt-10 grid overflow-hidden rounded-3xl border border-border-strong bg-white transition-[border-color,box-shadow] duration-300 hover:border-primary-400 hover:shadow-lift lg:grid-cols-[1fr_1.15fr]">
        <Link
          href={`/events/${event.slug}`}
          className="relative block h-56 overflow-hidden bg-primary-700 sm:h-64 lg:h-full lg:min-h-[19rem]"
        >
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center">
              <span aria-hidden="true" className="brand-mesh absolute inset-0 opacity-80" />
              <Illustration
                name={illustrationForEvent(event.title)}
                tone="navy"
                className="relative w-[46%] max-w-[15rem]"
              />
            </span>
          )}

          <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-700">
            Next up
          </span>
        </Link>

        <div className="flex flex-col justify-center gap-5 p-7 sm:p-9">
          <div className="flex items-start gap-5">
            <DateBadge date={event.startsAt} large />

            <div className="min-w-0">
              <h3 className="text-2xl font-semibold leading-tight text-fg sm:text-display-xs">
                <Link href={`/events/${event.slug}`} className="transition-colors hover:text-primary-600">
                  {event.title}
                </Link>
              </h3>

              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} aria-hidden="true" />
                  {formatEventTime(event.startsAt, event.endsAt)}
                </span>
                {(event.venue || event.city) && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} aria-hidden="true" />
                    {[event.venue, event.city].filter(Boolean).join(", ")}
                  </span>
                )}
              </p>
            </div>
          </div>

          {event.summary && <p className="text-[1.02rem] leading-relaxed text-muted">{event.summary}</p>}

          <Link
            href={`/events/${event.slug}`}
            className="group/cta inline-flex w-fit items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-[0.95rem] font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-primary-700 hover:shadow-glow-navy"
          >
            Event details
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/cta:translate-x-1"
            />
          </Link>
        </div>
      </article>
    </FadeIn>
  );
}

function EventCard({ event }: { event: EventRow }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border-strong bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-primary-400 hover:shadow-lift">
      <div className="flex items-start gap-4">
        <DateBadge date={event.startsAt} />

        <div className="min-w-0">
          <h3 className="font-semibold leading-snug text-fg">
            <Link href={`/events/${event.slug}`} className="transition-colors hover:text-primary-600">
              {event.title}
            </Link>
          </h3>

          {(event.venue || event.city) && (
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={13} className="shrink-0" aria-hidden="true" />
              {[event.venue, event.city].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </div>

      {event.summary && (
        <p className="mt-4 line-clamp-3 flex-1 text-[0.925rem] leading-relaxed text-muted">
          {event.summary}
        </p>
      )}

      <Link
        href={`/events/${event.slug}`}
        className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-accent-600"
      >
        Event details
        <ArrowRight
          size={15}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/link:translate-x-1"
        />
      </Link>
    </article>
  );
}
