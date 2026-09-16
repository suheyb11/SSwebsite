// The closing band every page ends on. It was copied into five pages before;
// keeping it in one place means the heading sizes, the brand wash and the
// button treatment stay identical everywhere.
//
// Two tones. `brand` is the navy band most pages close on. `light` is the same
// band on white, for a page that has already ended on a dark or tinted section
// and would otherwise stack two heavy blocks on top of each other.

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button, Section, cx } from "@/components/ui";
import { FadeIn } from "@/components/motion";

type CtaLink = { label: string; href: string };

export default function CtaBand({
  eyebrow,
  title,
  text,
  primary,
  secondary,
  tone = "brand",
}: {
  /** Optional line above the heading — used for the care phone number. */
  eyebrow?: ReactNode;
  title: string;
  text: string;
  primary: CtaLink;
  secondary?: CtaLink;
  tone?: "brand" | "light";
}) {
  const onDark = tone === "brand";

  return (
    <Section
      tone={onDark ? "brand" : "plain"}
      className={cx("relative overflow-hidden", !onDark && "border-t border-border bg-white")}
    >
      {onDark ? (
        <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-70" />
      ) : (
        // A soft accent glow behind the heading, so the white band still reads
        // as a closing statement rather than more page.
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-56 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-accent-200/40 blur-3xl"
        />
      )}

      <FadeIn className="relative flex flex-col items-center gap-6 text-center">
        {eyebrow}

        <h2
          className={cx(
            "max-w-2xl text-display-sm font-semibold sm:text-display-md",
            !onDark && "text-fg"
          )}
        >
          {title}
        </h2>

        <p className={cx("max-w-xl text-lg", onDark ? "text-white/75" : "text-muted")}>{text}</p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button href={primary.href} variant={onDark ? "accent" : "primary"} size="lg">
            {primary.label} <ArrowRight size={20} />
          </Button>

          {secondary && (
            // The outline button's default colours are tuned for a light
            // background, so only the navy band needs the white-on-navy variant.
            <Button href={secondary.href} variant="outline" size="lg" onDark={onDark}>
              {secondary.label}
            </Button>
          )}
        </div>
      </FadeIn>
    </Section>
  );
}
