"use client";

// Pick a category, see the bundles that match, then read how to activate one.
// Every bundle comes from the Plan table, so the tariff stays editable.

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Badge, Button, Card, Section, SectionTitle, cx } from "@/components/ui";
import { CardHover, FadeIn, Stagger, StaggerItem } from "@/components/motion";
import Glyph from "@/components/ui/Glyph";
import { iconFor } from "@/lib/icons";
import { t as copy } from "@/lib/copy";

export type BundleView = {
  id: number;
  category: string;
  product: string;
  productHref: string;
  /** Deep link that opens the recharge panel already filled in. */
  rechargeHref: string;
  title: string;
  price: number;
  unit: string | null;
  features: string[];
  highlight: boolean;
};

export type HowToStep = { icon: string; title: string; text: string };

const CATEGORIES = ["all", "data", "voice", "combo", "home"] as const;

export default function BundlePicker({
  bundles,
  steps,
  payments,
}: {
  bundles: BundleView[];
  steps: HowToStep[];
  payments: HowToStep[];
}) {
  const t = copy.topup;
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("all");
  const reduce = useReducedMotion();

  const shown = useMemo(
    () => (category === "all" ? bundles : bundles.filter((b) => b.category === category)),
    [bundles, category]
  );

  return (
    <>
      <Section id="bundles" tone="muted">
        <SectionTitle eyebrow={t.eyebrow} title={t.title} description={t.description} />

        {/* Category filter */}
        <FadeIn className="mb-10">
          <div role="group" aria-label={t.category} className="flex flex-wrap justify-center gap-2.5">
            {CATEGORIES.map((key) => {
              const active = key === category;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  aria-pressed={active}
                  className={cx(
                    "rounded-full border px-5 py-2.5 text-[0.95rem] font-medium transition-[background-color,border-color,color] duration-200",
                    active
                      ? "border-accent-500 bg-accent-500 text-primary-700"
                      : "border-border-strong text-muted hover:border-primary-400 hover:text-fg"
                  )}
                >
                  {t.categories[key]}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Matching bundles */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.28 }}
          >
            {shown.length === 0 ? (
              <p className="surface p-10 text-center text-muted">{t.noBundles}</p>
            ) : (
              <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((bundle) => (
                  <StaggerItem key={bundle.id}>
                    <CardHover className="group h-full">
                      <Card
                        emphasis={bundle.highlight ? "feature" : "default"}
                        className="relative flex h-full flex-col"
                      >
                        {bundle.highlight && (
                          <Badge tone="accent" className="absolute -top-3 left-7">
                            {t.mostPopular}
                          </Badge>
                        )}

                        <p className="text-sm font-medium text-muted">{bundle.product}</p>
                        <h3 className="mt-1 text-lg font-semibold text-fg">{bundle.title}</h3>

                        <div className="mt-5 flex items-baseline gap-1 text-fg">
                          <span className="text-lg font-medium text-muted">$</span>
                          <span className="text-4xl font-semibold tracking-tight">{bundle.price}</span>
                          {bundle.unit && <span className="text-base text-muted">/ {bundle.unit}</span>}
                        </div>

                        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                          {t.includes}
                        </p>

                        <ul className="mt-3 space-y-2.5">
                          {bundle.features.map((feature) => (
                            <li key={feature} className="flex gap-2.5 text-[0.95rem] text-muted">
                              <Check size={17} className="mt-0.5 shrink-0 text-accent-500" aria-hidden="true" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* Two actions: recharge straight away, or read the
                            detail first. The primary one no longer dead-ends. */}
                        <div className="mt-7 space-y-2 pt-1">
                          <Button
                            href={bundle.rechargeHref}
                            variant={bundle.highlight ? "accent" : "primary"}
                            size="sm"
                            className="w-full"
                          >
                            {t.buyNow}
                          </Button>
                          <Button href={bundle.productHref} variant="outline" size="sm" className="w-full">
                            {t.activateNow}
                          </Button>
                        </div>
                      </Card>
                    </CardHover>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* How to activate */}
      <Section>
        <SectionTitle eyebrow={t.eyebrow} title={t.howToActivate} />

        {/* A sequence, so it runs down a timeline rather than across four cards. */}
        <Stagger className="relative mx-auto max-w-3xl">
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[26px] top-3 w-px bg-border-strong"
          />
          <ol className="space-y-8">
            {steps.map((step, i) => (
              <StaggerItem key={step.title}>
                <li className="relative flex gap-6">
                  <span className="relative z-10 grid h-13 w-13 shrink-0 place-items-center rounded-full border border-border-strong bg-bg">
                    <Glyph Icon={iconFor(step.icon)} />
                  </span>
                  <div className="pt-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-fg">{step.title}</h3>
                    <p className="mt-2 text-muted">{step.text}</p>
                  </div>
                </li>
              </StaggerItem>
            ))}
          </ol>
        </Stagger>

        {/* Payment methods */}
        <FadeIn className="mt-14">
          <h3 className="mb-6 text-center text-lg font-semibold text-fg">{t.paymentMethods}</h3>
          <Stagger className="grid gap-6 sm:grid-cols-3">
            {payments.map((method) => (
              <StaggerItem key={method.title}>
                <CardHover className="group h-full">
                  <Card className="flex h-full gap-4">
                    <Glyph Icon={iconFor(method.icon)} />
                    <div>
                      <h4 className="font-semibold text-fg">{method.title}</h4>
                      <p className="mt-1.5 text-[0.95rem] text-muted">{method.text}</p>
                    </div>
                  </Card>
                </CardHover>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeIn>
      </Section>
    </>
  );
}
