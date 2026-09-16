// The section blocks a page is built from. One component per PageSection.type.
//
// They all share the same rules as the rest of the site: outline cards, images
// with no border or box behind them, brand colours only, and every reveal going
// through the wrappers in components/motion so reduced motion is respected.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button, Card, Container, Section, SectionTitle, cx } from "@/components/ui";
import {
  CardHover,
  CountUp,
  FadeIn,
  IconPop,
  ImageReveal,
  Parallax,
  Stagger,
  StaggerItem,
} from "@/components/motion";
import Markdown from "@/components/ui/Markdown";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CtaBand from "@/components/sections/CtaBand";
import VideoPlayer from "@/components/sections/VideoPlayer";
import { iconFor } from "@/lib/icons";
import { bleedsOffBottom, isTransparent } from "@/lib/transparent-images";
import Illustration, { type IllustrationName } from "@/components/ui/Illustration";
import type { SectionItem, SectionView } from "@/lib/sections";

/** The tinted glyph every card and step uses. No box around images — icons only. */
function Glyph({ name, size = "md" }: { name?: string; size?: "md" | "lg" }) {
  const Icon = iconFor(name);
  const box = size === "lg" ? "h-14 w-14" : "h-11 w-11";

  return (
    <IconPop
      className={cx(
        "grid shrink-0 place-items-center rounded-xl bg-accent-500/15 text-primary-600",
        box
      )}
    >
      <Icon size={size === "lg" ? 24 : 20} aria-hidden="true" />
    </IconPop>
  );
}

/**
 * A section image. The two kinds of picture here want opposite treatment:
 *
 *   cut-out — a subject on a transparent background (see transparent-images.ts).
 *             Shown whole with `object-contain`, on no container at all, so it
 *             sits directly on the page or on the navy hero.
 *   photo   — a photograph. It *fills* its rounded frame edge to edge with
 *             `object-cover`. No mask, no padding, no card behind it: the frame
 *             is the photograph itself.
 */
const ILLUSTRATION_PREFIX = "illus:";

function SectionImage({
  src,
  priority = false,
  delay = 0,
  onHero = false,
  className,
}: {
  src: string;
  priority?: boolean;
  delay?: number;
  /** Hero cut-outs get their cropped bottom edge faded into the navy. */
  onHero?: boolean;
  className?: string;
}) {
  // A drawing rather than a file: no request, no box, always on-brand.
  if (src.startsWith(ILLUSTRATION_PREFIX)) {
    const name = src.slice(ILLUSTRATION_PREFIX.length) as IllustrationName;

    return (
      <ImageReveal float delay={delay} className={className}>
        <Illustration
          name={name}
          tone={onHero ? "navy" : "light"}
          className={onHero ? "mx-auto max-w-[17rem]" : "mx-auto max-w-[24rem]"}
        />
      </ImageReveal>
    );
  }

  // Checked against the decoded alpha channel, not the file extension — plenty
  // of PNGs here are opaque and would render as a hard rectangle.
  const cutout = isTransparent(src);

  return (
    <ImageReveal float={cutout} delay={delay} className={className}>
      <Image
        src={src}
        alt=""
        width={860}
        height={620}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={cx(
          "w-full",
          cutout
            ? cx(
                "max-h-[26rem] object-contain",
                onHero
                  ? cx(
                      "drop-shadow-[0_20px_45px_rgba(0,0,0,0.35)]",
                      // Only fade the bottom of a subject that is actually cut
                      // off by the edge of its file. A whole standing figure
                      // ends inside its frame, and fading that erases its feet.
                      bleedsOffBottom(src) && "cutout-fade"
                    )
                  : "drop-shadow-[0_18px_35px_rgba(11,18,37,0.16)]"
              )
            : "aspect-[4/3] rounded-2xl object-cover"
        )}
      />
    </ImageReveal>
  );
}

/** A card body shared by the feature grid and the steps row. */
function ItemCard({ item, index }: { item: SectionItem; index?: number }) {
  const body = (
    <Card className="flex h-full flex-col">
      {/* Card artwork. A drawing sits straight on the card; a photo fills its
          rounded frame edge to edge. Neither ever gets a white box. */}
      {item.image?.startsWith(ILLUSTRATION_PREFIX) ? (
        <Illustration
          name={item.image.slice(ILLUSTRATION_PREFIX.length) as IllustrationName}
          className="mb-4 h-28"
        />
      ) : (
        item.image && (
          <Image
            src={item.image}
            alt=""
            width={480}
            height={280}
            className="mb-6 h-36 w-full rounded-xl object-cover"
          />
        )
      )}

      <div className="flex items-center gap-4">
        <Glyph name={item.icon} />
        {index !== undefined && (
          <span className="text-sm font-semibold text-muted">Step {index + 1}</span>
        )}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-fg">{item.title}</h3>
      {item.text && <p className="mt-2.5 text-muted">{item.text}</p>}

      {item.href && (
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-transform duration-300 group-hover:translate-x-1">
          Learn more <ArrowRight size={15} aria-hidden="true" />
        </span>
      )}
    </Card>
  );

  if (!item.href) return body;

  return (
    <Link href={item.href} className="group block h-full">
      {body}
    </Link>
  );
}

/** Section 1: the page hero — eyebrow, title, lead, buttons and an image. */
function HeroBlock({ section }: { section: SectionView }) {
  return (
    <div className="relative overflow-hidden bg-primary-700 py-8 sm:py-12">
      <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-80" />

      <Container className="relative">
        <div className={cx("grid items-center gap-8", section.image ? "lg:grid-cols-[1.2fr_1fr]" : "max-w-3xl")}>
          <FadeIn>
            {section.eyebrow && (
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
                {section.eyebrow}
              </p>
            )}

            <h1 className="text-display-sm font-semibold text-white sm:text-display-md lg:text-display-lg">
              {section.title}
            </h1>

            <div className="accent-rule mt-5" />

            {section.body && <p className="mt-5 max-w-xl text-lg text-white/75">{section.body}</p>}

            <div className="mt-7 flex flex-wrap gap-4">
              {section.ctaLabel && section.ctaHref && (
                <Button href={section.ctaHref} variant="accent" size="lg">
                  {section.ctaLabel}
                </Button>
              )}
              {section.ctaLabel2 && section.ctaHref2 && (
                <Button
                  href={section.ctaHref2}
                  variant="outline"
                  size="lg"
              onDark
                >
                  {section.ctaLabel2}
                </Button>
              )}
            </div>
            {/* The three promises used to be a whole section of their own on
                every product page. Inline here they cost no extra page height
                and the repetition disappears. */}
            {section.items.length > 0 && (
              <Stagger className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6">
                {section.items.map((item) => {
                  const Icon = iconFor(item.icon);

                  return (
                    <StaggerItem key={item.title}>
                      <p className="flex items-center gap-2.5 text-sm font-semibold text-white">
                        <Icon size={17} className="shrink-0 text-accent-500" aria-hidden="true" />
                        {item.title}
                      </p>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            )}
          </FadeIn>

          {section.image && (
            <div className="relative">
              {/* A soft yellow bloom behind the subject so a cut-out reads as
                  part of the scene rather than pasted onto the navy. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-0"
                style={{
                  background:
                    "radial-gradient(48% 46% at 50% 52%, rgb(254 217 0 / 0.28), transparent 70%)",
                }}
              />
              <div className="relative">
                <SectionImage src={section.image} priority delay={0.12} onHero />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

/** Section 2: image on one side, copy on the other. `flip` swaps them. */
function ImageTextBlock({ section }: { section: SectionView }) {
  return (
    <Section tone={section.tone}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* SectionImage brings its own reveal; Parallax adds a slow drift as the
            row scrolls past, which is the one motion moment each page gets. */}
        {section.image && (
          <Parallax distance={44} className={cx(section.flip && "lg:order-2")}>
            <SectionImage src={section.image} />
          </Parallax>
        )}

        <FadeIn delay={0.1} className={cx(section.flip && "lg:order-1")}>
          {section.eyebrow && <p className="eyebrow mb-4">{section.eyebrow}</p>}

          {section.title && (
            <h2 className="text-display-sm font-semibold text-fg sm:text-display-md">
              {section.title}
            </h2>
          )}

          <div className="accent-rule mt-6" />

          {section.body && (
            <div className="mt-6">
              <Markdown content={section.body} />
            </div>
          )}

          {/* Short bullet list of highlights, if the section has items. */}
          {section.items.length > 0 && (
            <Stagger className="mt-8 space-y-4">
              {section.items.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex gap-4">
                    <Glyph name={item.icon} />
                    <div>
                      <p className="font-semibold text-fg">{item.title}</p>
                      {item.text && <p className="mt-1 text-muted">{item.text}</p>}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {section.ctaLabel && section.ctaHref && (
            <div className="mt-9">
              <Button href={section.ctaHref}>{section.ctaLabel}</Button>
            </div>
          )}
        </FadeIn>
      </div>
    </Section>
  );
}

/**
 * Section 2b: several short topics side by side instead of one full-width row
 * each. This is what keeps a long page from becoming a tall stack of bands —
 * five prose sections collapse into one dense block.
 */
function TextColumnsBlock({ section }: { section: SectionView }) {
  // Two columns reads better than three once the text runs past a line or two.
  const columns = section.items.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <Section tone={section.tone}>
      {section.title && (
        <SectionTitle
          eyebrow={section.eyebrow ?? undefined}
          title={section.title}
          description={section.body ?? undefined}
        />
      )}

      <Stagger className={cx("grid gap-5", columns)}>
        {section.items.map((item) => (
          <StaggerItem key={item.title}>
            <CardHover className="group h-full">
              <Card className="flex h-full gap-4 p-6">
                <Glyph name={item.icon} />
                <div>
                  <h3 className="font-semibold text-fg">{item.title}</h3>
                  {item.text && <p className="mt-2 text-[0.95rem] text-muted">{item.text}</p>}
                </div>
              </Card>
            </CardHover>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/** Section 3: a grid of outline cards, each with an icon, title and text. */
function FeatureGridBlock({ section }: { section: SectionView }) {
  const columns = section.items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Section tone={section.tone}>
      {section.title && (
        <SectionTitle
          eyebrow={section.eyebrow ?? undefined}
          title={section.title}
          description={section.body ?? undefined}
        />
      )}

      <Stagger className={cx("grid gap-6", columns)}>
        {section.items.map((item) => (
          <StaggerItem key={item.title}>
            <CardHover className="group h-full">
              <ItemCard item={item} />
            </CardHover>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/** Section 4: a row of numbers that count up as they scroll into view. */
function StatsBlock({ section }: { section: SectionView }) {
  return (
    <Section tone={section.tone}>
      {section.title && (
        <SectionTitle
          eyebrow={section.eyebrow ?? undefined}
          title={section.title}
          description={section.body ?? undefined}
        />
      )}

      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {section.items.map((item) => (
          <StaggerItem key={item.title}>
            <Card className="text-center">
              <p className="text-display-sm font-semibold text-primary-600">
                <CountUp value={item.value ?? 0} prefix={item.prefix ?? ""} suffix={item.suffix ?? ""} />
              </p>
              <p className="mt-3 font-semibold text-fg">{item.title}</p>
              {item.text && <p className="mt-1.5 text-[0.95rem] text-muted">{item.text}</p>}
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/** Section 5: numbered how-it-works cards. */
/**
 * A vertical timeline: numbered markers strung along one line.
 *
 * The site had drifted into showing everything as a row of cards. A sequence is
 * genuinely different information from a set of features, so it gets its own
 * shape — the connecting line does the explaining that a card grid cannot.
 */
function TimelineBlock({ section }: { section: SectionView }) {
  return (
    <Section tone={section.tone}>
      {section.title && (
        <SectionTitle
          eyebrow={section.eyebrow ?? undefined}
          title={section.title}
          description={section.body ?? undefined}
        />
      )}

      <Stagger className="relative mx-auto max-w-3xl">
        {/* The spine. It sits behind the markers and stops at the last one. */}
        <span
          aria-hidden="true"
          className="absolute bottom-8 left-[22px] top-3 w-px bg-border-strong sm:left-[26px]"
        />

        <ol className="space-y-9">
          {section.items.map((item, i) => (
            <StaggerItem key={item.title}>
              <li className="relative flex gap-6">
                <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-strong bg-bg text-sm font-semibold text-primary-600 sm:h-13 sm:w-13">
                  {i + 1}
                </span>

                <div className="pt-1.5">
                  <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
                  {item.text && <p className="mt-2 text-muted">{item.text}</p>}
                </div>
              </li>
            </StaggerItem>
          ))}
        </ol>
      </Stagger>
    </Section>
  );
}

/**
 * A sticky heading beside a plain ticked list.
 *
 * No cards at all: the list reads as one continuous thought rather than a set of
 * separate boxes, which suits "what is included" copy far better than a grid.
 */
function ChecklistBlock({ section }: { section: SectionView }) {
  return (
    <Section tone={section.tone}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <FadeIn className="lg:sticky lg:top-28 lg:self-start">
          {section.eyebrow && <p className="eyebrow mb-4">{section.eyebrow}</p>}
          {section.title && (
            <h2 className="text-display-sm font-semibold text-fg sm:text-display-md">
              {section.title}
            </h2>
          )}
          <div className="accent-rule mt-5" />
          {section.body && <p className="mt-5 text-lg text-muted">{section.body}</p>}
        </FadeIn>

        <Stagger>
          <ul className="divide-y divide-border">
            {section.items.map((item) => (
              <StaggerItem key={item.title}>
                <li className="flex gap-4 py-5 first:pt-0">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500">
                    <Check size={14} strokeWidth={3} className="text-primary-700" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-fg">{item.title}</p>
                    {item.text && <p className="mt-1.5 text-muted">{item.text}</p>}
                  </div>
                </li>
              </StaggerItem>
            ))}
          </ul>
        </Stagger>
      </div>
    </Section>
  );
}

/** A video, framed by the usual section heading. */
function VideoBlock({ section }: { section: SectionView }) {
  if (!section.video) return null;

  return (
    <Section tone={section.tone}>
      {section.title && (
        <SectionTitle
          eyebrow={section.eyebrow ?? undefined}
          title={section.title}
          description={section.body ?? undefined}
        />
      )}

      <FadeIn className="mx-auto max-w-4xl">
        <VideoPlayer
          source={section.video}
          poster={section.image}
          label={section.ctaLabel ?? section.title ?? "Play video"}
          // A video section's first item carries its length and file size.
          meta={section.items[0]?.title}
        />
      </FadeIn>
    </Section>
  );
}

function StepsBlock({ section }: { section: SectionView }) {
  return (
    <Section tone={section.tone}>
      {section.title && (
        <SectionTitle
          eyebrow={section.eyebrow ?? undefined}
          title={section.title}
          description={section.body ?? undefined}
        />
      )}

      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {section.items.map((item, i) => (
          <StaggerItem key={item.title}>
            <CardHover className="group h-full">
              <ItemCard item={item} index={i} />
            </CardHover>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/** Section 6: an FAQ accordion built from the section's items. */
function FaqBlock({ section }: { section: SectionView }) {
  const faqs = section.items.map((item, i) => ({
    id: i,
    question: item.title,
    answer: item.text ?? "",
  }));

  return (
    <Section tone={section.tone}>
      <SectionTitle
        eyebrow={section.eyebrow ?? "FAQ"}
        title={section.title ?? "Frequently asked questions"}
        description={section.body ?? undefined}
      />
      <FaqAccordion items={faqs} />
    </Section>
  );
}

/** Section 7: long-form prose, for the parts that really are an article. */
function RichTextBlock({ section }: { section: SectionView }) {
  return (
    <Section tone={section.tone}>
      {section.title && (
        <SectionTitle
          eyebrow={section.eyebrow ?? undefined}
          title={section.title}
          description={undefined}
        />
      )}

      <FadeIn className="mx-auto max-w-3xl">
        <Markdown content={section.body} />
      </FadeIn>
    </Section>
  );
}

/**
 * A row of terms to choose between — how long money is set aside for, or how
 * long a plan runs. Deliberately not the pricing cards: there is nothing to buy
 * here, the reader is picking a length, so each card leads with the duration
 * rather than with a price, and the row is read across rather than down.
 *
 * `badge` on an item both prints a small ribbon and marks that card as the
 * emphasised one in the row, so the option most people take stands out without
 * a second field to keep in step.
 */
function TermsBlock({ section }: { section: SectionView }) {
  const columns =
    section.items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Section id="terms" tone={section.tone}>
      {section.title && (
        <SectionTitle
          eyebrow={section.eyebrow ?? undefined}
          title={section.title}
          description={section.body ?? undefined}
        />
      )}

      <Stagger className={cx("grid gap-6", columns)}>
        {section.items.map((item) => (
          <StaggerItem key={item.title}>
            <CardHover className="group h-full">
              {/* The ribbon hangs over the card's top edge, so the card needs
                  to be the positioning context and must not clip it. */}
              <Card
                emphasis={item.badge ? "feature" : "default"}
                className="relative flex h-full flex-col text-center"
              >
                {item.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-500 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-primary-700">
                    {item.badge}
                  </span>
                )}

                <p className="text-display-xs font-semibold leading-none text-primary-600">
                  {item.title}
                </p>

                {item.text && (
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{item.text}</p>
                )}
              </Card>
            </CardHover>
          </StaggerItem>
        ))}
      </Stagger>

      {section.ctaLabel && section.ctaHref && (
        <FadeIn className="mt-10 flex justify-center">
          <Button href={section.ctaHref} variant="accent" size="lg">
            {section.ctaLabel} <ArrowRight size={20} />
          </Button>
        </FadeIn>
      )}
    </Section>
  );
}

/** Picks the component for a section's type. */
export function SectionBlock({ section }: { section: SectionView }) {
  switch (section.type) {
    case "hero":
      return <HeroBlock section={section} />;
    case "image-text":
      return <ImageTextBlock section={section} />;
    case "text-columns":
      return <TextColumnsBlock section={section} />;
    case "feature-grid":
      return <FeatureGridBlock section={section} />;
    case "stats":
      return <StatsBlock section={section} />;
    case "steps":
      return <StepsBlock section={section} />;
    case "timeline":
      return <TimelineBlock section={section} />;
    case "checklist":
      return <ChecklistBlock section={section} />;
    case "terms":
      return <TermsBlock section={section} />;
    case "video":
      return <VideoBlock section={section} />;
    case "faq":
      return <FaqBlock section={section} />;
    case "cta":
      return (
        <CtaBand
          title={section.title ?? ""}
          text={section.body ?? ""}
          primary={{ label: section.ctaLabel ?? "Contact us", href: section.ctaHref ?? "/contact-us" }}
          secondary={
            section.ctaLabel2 && section.ctaHref2
              ? { label: section.ctaLabel2, href: section.ctaHref2 }
              : undefined
          }
        />
      );
    case "richtext":
    default:
      return <RichTextBlock section={section} />;
  }
}
