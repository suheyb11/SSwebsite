import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CalendarCheck, FileText, Mail, ShieldCheck } from "lucide-react";
import { db } from "@/lib/db";
import { headingsOf } from "@/lib/content";
import { Button, Container, Section, cx } from "@/components/ui";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import Markdown from "@/components/ui/Markdown";
import { formatDate, t } from "@/lib/copy";

type Props = { params: Promise<{ slug: string }> };

/**
 * One template for every legal / static markdown page.
 *
 * A privacy policy is a long document, and rendering it as one unbroken column
 * of prose made it a wall of text nobody would read. It now has the furniture a
 * real document needs: a contents panel that sticks while you scroll, a dated
 * history so the version in front of you is obvious, and a reading column that
 * is narrow enough to actually read.
 */

export async function generateStaticParams() {
  const pages = await db.page.findMany({ select: { slug: true } });
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await db.page.findUnique({ where: { slug } });

  if (!page) return { title: "Page not found" };

  return {
    title: (page.title ?? ""),
    description: (page.description ?? "") || undefined,
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = await db.page.findUnique({ where: { slug } });

  if (!page) notFound();

  const title = (page.title ?? "");
  const description = (page.description ?? "");
  const body = (page.body ?? "");
  const sections = headingsOf(body);

  // The document's own history. Dates come from the record so they cannot drift
  // out of step with the text.
  // TODO: once legal counsel signs the documents off, replace the effective and
  // review dates with the real ones rather than deriving them from updatedAt.
  const updated = page.updatedAt;
  const effective = new Date(updated);
  const review = new Date(updated);
  review.setFullYear(review.getFullYear() + 1);

  const history = [
    {
      Icon: FileText,
      label: "Published",
      date: effective,
      text:
        "This version of the document was first published.",
    },
    {
      Icon: CalendarCheck,
      label: "Last reviewed",
      date: updated,
      text:
        "The most recent review of the wording on this page.",
    },
    {
      Icon: ShieldCheck,
      label: "Next review",
      date: review,
      text:
        "We review these documents at least once a year.",
    },
  ];

  return (
    <>
      {/* A document header rather than the generic page header: the title, what
          it covers, and when it was last touched, all in one glance. */}
      <div className="relative overflow-hidden bg-primary-600 py-10 sm:py-12">
        <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-90" />

        <Container className="relative">
          <FadeIn>
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/65">
                <li>
                  <Link href="/" className="transition-colors hover:text-accent-500">
                    {t.nav.home}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white">{title}</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h1 className="max-w-3xl text-display-sm font-semibold text-white sm:text-display-md">
                  {title}
                </h1>
                {description && (
                  <p className="mt-4 max-w-2xl text-lg text-white/75">{description}</p>
                )}
              </div>

              <p className="rounded-full border border-white/25 px-4 py-2 text-sm text-white/80">
                {"Last updated"}{" "}
                <time dateTime={updated.toISOString()} className="font-semibold text-accent-500">
                  {formatDate(updated)}
                </time>
              </p>
            </div>
          </FadeIn>
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* Contents — sticky, so you never lose your place in a long document. */}
          <FadeIn className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4">{"Contents"}</p>

            <nav aria-label={"Contents"}>
              <ol className="space-y-1 border-l border-border-strong">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={cx(
                        "-ml-px block border-l-2 border-transparent py-2 pl-4 text-sm text-muted",
                        "transition-colors hover:border-accent-500 hover:text-fg"
                      )}
                    >
                      <span className="mr-2 text-muted/60">{String(i + 1).padStart(2, "0")}</span>
                      {section.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </FadeIn>

          {/* The document itself, at a readable measure. */}
          <FadeIn delay={0.1} className="min-w-0">
            <Markdown content={body} />
          </FadeIn>
        </div>
      </Section>

      {/* Document history, as a timeline rather than a line of small print. */}
      <Section tone="muted">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-4">{"Document history"}</p>
          <h2 className="text-display-xs font-semibold text-fg sm:text-display-sm">
            {"How this document is kept current"}
          </h2>

          <Stagger className="relative mt-9">
            <span
              aria-hidden="true"
              className="absolute bottom-8 left-[22px] top-3 w-px bg-border-strong"
            />

            <ol className="space-y-8">
              {history.map(({ Icon, label, date, text }) => (
                <StaggerItem key={label}>
                  <li className="relative flex gap-6">
                    <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-strong bg-bg text-primary-600">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div className="pt-1">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                        {label}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-fg">
                        <time dateTime={date.toISOString()}>{formatDate(date)}</time>
                      </p>
                      <p className="mt-1.5 text-muted">{text}</p>
                    </div>
                  </li>
                </StaggerItem>
              ))}
            </ol>
          </Stagger>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={"/contact-us"}>
              <Mail size={18} />
              {"Ask about this document"}
            </Button>
            <Button href={"/support"} variant="outline">
              {t.common.learnMore}
            </Button>
          </div>
        </div>
      </Section>

    </>
  );
}
