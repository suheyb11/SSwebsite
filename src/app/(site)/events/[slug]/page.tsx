import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { db } from "@/lib/db";
import { formatEventDate, formatEventTime, isEventOver } from "@/lib/content";
import { Container, Section, cx } from "@/components/ui";
import Markdown from "@/components/ui/Markdown";
import { FadeIn } from "@/components/motion";
import Illustration, { illustrationForEvent } from "@/components/ui/Illustration";
import CtaBand from "@/components/sections/CtaBand";

type Props = { params: Promise<{ slug: string }> };

/** Whether an event has been and gone decides the tense on the page. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await db.event.findUnique({ where: { slug } });

  if (!event) return { title: "Event not found" };

  return { title: event.title, description: event.summary ?? undefined };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;

  const event = await db.event.findUnique({ where: { slug } });
  if (!event || !event.published) notFound();

  const over = isEventOver(event);

  // The next event after this one, so a reader has somewhere to go.
  const next = await db.event.findFirst({
    where: { published: true, startsAt: { gt: new Date() }, id: { not: event.id } },
    orderBy: { startsAt: "asc" },
    select: { slug: true, title: true, startsAt: true },
  });

  return (
    <>
      <header className="relative overflow-hidden bg-primary-600 pt-10 sm:pt-12">
        <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-90" />

        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/65">
              <li>
                <Link href="/" className="transition-colors hover:text-accent-500">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/events" className="transition-colors hover:text-accent-500">
                  Events
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="max-w-[16rem] truncate text-white">{event.title}</li>
            </ol>
          </nav>

          <span
            className={cx(
              "mb-5 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
              over ? "bg-white/15 text-white" : "bg-accent-500 text-primary-700"
            )}
          >
            {over ? "This event has passed" : "Upcoming"}
          </span>

          <h1 className="max-w-4xl text-display-sm font-semibold text-white sm:text-display-md">
            {event.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/80">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={15} aria-hidden="true" />
              {formatEventDate(event.startsAt, event.endsAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={15} aria-hidden="true" />
              {formatEventTime(event.startsAt, event.endsAt)}
            </span>
            {(event.venue || event.city) && (
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} aria-hidden="true" />
                {[event.venue, event.city].filter(Boolean).join(", ")}
              </span>
            )}
          </div>

          <div className="h-10 sm:h-12" />
        </Container>
      </header>

      <Container className="mt-8 sm:mt-10">
        <FadeIn>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-primary-700 shadow-lift">
            {event.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt=""
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
              />
            ) : (
              <span className="absolute inset-0 grid place-items-center">
                <span aria-hidden="true" className="brand-mesh absolute inset-0 opacity-80" />
                <Illustration
                  name={illustrationForEvent(event.title)}
                  tone="navy"
                  className="relative w-[40%] max-w-[26rem]"
                />
              </span>
            )}
          </div>
        </FadeIn>
      </Container>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
          <div className="min-w-0">
            <FadeIn>
              {event.summary && (
                <p className="border-l-2 border-accent-500 pl-5 text-xl leading-relaxed text-muted">
                  {event.summary}
                </p>
              )}

              <div className="mt-8">
                <Markdown content={event.body} />
              </div>
            </FadeIn>

            <div className="mt-10 border-t border-border pt-6">
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 text-[0.95rem] font-semibold text-primary-600 transition-colors hover:text-accent-600"
              >
                <ArrowLeft
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                />
                All events
              </Link>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="surface p-6">
              <h2 className="eyebrow">Details</h2>

              <dl className="mt-4 space-y-3 text-[0.95rem]">
                <div>
                  <dt className="text-muted">Date</dt>
                  <dd className="font-medium text-fg">
                    {formatEventDate(event.startsAt, event.endsAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Time</dt>
                  <dd className="font-medium text-fg">
                    {formatEventTime(event.startsAt, event.endsAt)}
                  </dd>
                </div>
                {event.venue && (
                  <div>
                    <dt className="text-muted">Venue</dt>
                    <dd className="font-medium text-fg">{event.venue}</dd>
                  </div>
                )}
                {event.city && (
                  <div>
                    <dt className="text-muted">City</dt>
                    <dd className="font-medium text-fg">{event.city}</dd>
                  </div>
                )}
              </dl>

              {/* Only worth offering while there is still something to attend. */}
              {!over && event.ctaLabel && event.ctaHref && (
                <Link
                  href={event.ctaHref}
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 font-semibold text-primary-700 transition-[background-color,box-shadow] duration-200 hover:bg-accent-400 hover:shadow-glow"
                >
                  {event.ctaLabel}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              )}
            </div>

            {next && (
              <div className="surface p-6">
                <h2 className="eyebrow">Next event</h2>
                <Link
                  href={`/events/${next.slug}`}
                  className="mt-3 block font-semibold text-fg transition-colors hover:text-primary-600"
                >
                  {next.title}
                </Link>
                <p className="mt-1 text-sm text-muted">{formatEventDate(next.startsAt)}</p>
              </div>
            )}
          </aside>
        </div>
      </Section>

      <CtaBand
        tone="light"
        title={over ? "Catch the next one" : "See you there"}
        text="Every date is announced here first, and our team is on the line if you need anything before then."
        primary={{ label: "All events", href: "/events" }}
        secondary={{ label: "Contact us", href: "/contact-us" }}
      />
    </>
  );
}
