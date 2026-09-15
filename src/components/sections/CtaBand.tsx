// The navy closing band every page ends on. It was copied into five pages
// before; keeping it in one place means the heading sizes, the brand wash and
// the button treatment stay identical everywhere.

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button, Section } from "@/components/ui";
import { FadeIn } from "@/components/motion";

type CtaLink = { label: string; href: string };

export default function CtaBand({
  eyebrow,
  title,
  text,
  primary,
  secondary,
}: {
  /** Optional line above the heading — used for the care phone number. */
  eyebrow?: ReactNode;
  title: string;
  text: string;
  primary: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <Section tone="brand" className="relative overflow-hidden">
      <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-70" />

      <FadeIn className="relative flex flex-col items-center gap-6 text-center">
        {eyebrow}

        <h2 className="max-w-2xl text-display-sm font-semibold sm:text-display-md">{title}</h2>

        <p className="max-w-xl text-lg text-white/75">{text}</p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button href={primary.href} variant="accent" size="lg">
            {primary.label} <ArrowRight size={20} />
          </Button>

          {secondary && (
            // White-on-navy variant of the outline button — the default outline
            // colours are tuned for a light section background.
            <Button
              href={secondary.href}
              variant="outline"
              size="lg"
              onDark
            >
              {secondary.label}
            </Button>
          )}
        </div>
      </FadeIn>
    </Section>
  );
}
