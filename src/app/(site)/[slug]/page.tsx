import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Headset, ShieldCheck, Zap } from "lucide-react";
import { db, getSections, getSettings } from "@/lib/db";
import { toPlanView } from "@/lib/content";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import Glyph from "@/components/ui/Glyph";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import Markdown from "@/components/ui/Markdown";
import PricingCards from "@/components/sections/PricingCards";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { t } from "@/lib/copy";
import PageSections from "@/components/sections/PageSections";

type Props = { params: Promise<{ slug: string }> };

/**
 * One page for all 15 products. The old site had a separate file per product
 * with the same three sections (hero, pricing, FAQ), so they share a template here
 * and the differences live in the database.
 */

/** Pre-render every product at build time. */
export async function generateStaticParams() {
  const products = await db.product.findMany({ select: { slug: true } });
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });

  if (!product) return { title: "Page not found" };

  return {
    title: (product.name ?? ""),
    description:
      (product.tagline ?? "") ||
      (product.heroText ?? "") ||
      undefined,
  };
}

/**
 * Products that run in a colour of their own.
 *
 * eDahab is its own brand with its own green, so its pages should not be in
 * Somtel navy. The class redefines the primary ramp for everything inside it
 * (see globals.css) — no block component needs to know about it.
 */
const PAGE_THEME: Record<string, string> = {
  eDahab: "theme-edahab",
  Keydso: "theme-edahab", // eDahab's savings product, same brand
};

// Three promises shown under every product hero — the old pages repeated these too.
const highlights = [
  { Icon: Zap, title: "Fast & reliable", text: "The widest network coverage across the Somali region." },
  { Icon: ShieldCheck, title: "No hidden charges", text: "Clear pricing, so you always know what you pay for." },
  { Icon: Headset, title: "24/7 support", text: "Our customer care team is available day and night." },
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: {
      plans: { orderBy: { order: "asc" } },
      faqs: { orderBy: { order: "asc" } },
    },
  });

  if (!product) notFound();

  const [settings, sections] = await Promise.all([getSettings(), getSections(slug)]);
  const plans = product.plans.map(toPlanView);

  // Pages that have been converted to the section model render those blocks
  // instead of the old hero + markdown-body layout. Pricing and the product FAQ
  // still come from their own tables, and close the page either way.
  const theme = PAGE_THEME[slug] ?? "";

  if (sections.length > 0) {
    return (
      <div className={theme}>
        <PageSections sections={sections} />

        {plans.length > 0 && (
          <Section id="pricing" tone="muted">
            <SectionTitle
              eyebrow={"Pricing"}
              title={"Choose your plan"}
              description={
                "Every plan runs on the same line, so you can move between them with a phone call."}
            />
            <PricingCards plans={plans} />
          </Section>
        )}

        {product.faqs.length > 0 && (
          <Section>
            <SectionTitle eyebrow="FAQ" title={"Frequently Asked Questions"} />
            <FaqAccordion items={product.faqs.map((f) => ({ id: f.id, question: (f.question ?? ""), answer: (f.answer ?? "") }))} />
          </Section>
        )}

      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary-700 py-24 sm:py-32">
        {product.heroImage && (
          <>
            <Image
              src={product.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-primary-700/75" />
          </>
        )}

        {/* Brand wash sits above the photo so the type always has contrast. */}
        <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-70" />

        <Container className="relative">
          <FadeIn>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
              {product.category === "business" ? "Business" : "Personal"}
            </p>
            <h1 className="max-w-3xl text-display-sm font-semibold text-white sm:text-display-md lg:text-display-lg">
              {product.heroTitle ?? product.name}
            </h1>
            <div className="accent-rule mt-6" />
            {product.heroText && (
              <p className="mt-6 max-w-2xl text-lg text-white/75">{product.heroText}</p>
            )}

            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact-us" variant="accent" size="lg">
                Get started
              </Button>
              {settings.whatsapp && (
                <Button
                  href={settings.whatsapp}
                  variant="outline"
                  size="lg"
                  external
              onDark
                >
                  Talk to us
                </Button>
              )}
            </div>
          </FadeIn>
        </Container>
      </div>

      {/* Highlights */}
      <Section>
        <Stagger className="grid gap-6 sm:grid-cols-3">
          {highlights.map(({ Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="surface flex h-full gap-4 p-7 transition-[box-shadow,border-color,background-color] duration-300 hover:border-primary-400 hover:bg-primary-50/40 hover:shadow-glow-navy-soft">
                <Glyph Icon={Icon} tone="solid" />
                <div>
                  <h2 className="font-semibold text-fg">{title}</h2>
                  <p className="mt-1.5 text-[0.95rem] text-muted">{text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {product.body && (
          <FadeIn className="mt-16">
            <div className="mx-auto max-w-3xl">
              <Markdown content={product.body} />
            </div>
          </FadeIn>
        )}
      </Section>

      {/* Pricing — only for products that have plans */}
      {plans.length > 0 && (
        <Section id="pricing" tone="muted">
          <SectionTitle eyebrow="Pricing" title="Check Our Valuable Price" />
          <PricingCards plans={plans} />
        </Section>
      )}

      {/* FAQ */}
      {product.faqs.length > 0 && (
        <Section>
          <SectionTitle eyebrow="FAQ" title={"Frequently Asked Questions"} />
          <FaqAccordion items={product.faqs.map((f) => ({ id: f.id, question: (f.question ?? ""), answer: (f.answer ?? "") }))} />
        </Section>
      )}

    </>
  );
}
