// The scrolling partner logo strip, shared by the home page and /about.
//
// Logos are shown in their original colours on a transparent background — no
// greyscale, no opacity, no box behind them.

import Image from "next/image";
import { Marquee } from "@/components/motion";
import { cx } from "@/components/ui";

type Partner = {
  id: number;
  name: string;
  logoUrl: string;
};

/**
 * Most of these logos are wide wordmarks, so one height suits them all. A few
 * are round or square marks, which look far heavier than a wordmark at the same
 * height — those get their own smaller size so the row stays visually even.
 *
 * Add a partner name here if its logo ever looks oversized in the strip.
 */
const SMALLER: Record<string, true> = {
  Bluesky: true,
};

const DEFAULT_HEIGHT = "h-16 sm:h-20";
const SMALLER_HEIGHT = "h-12 sm:h-14";

export default function PartnerStrip({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;

  return (
    // Slow seamless strip. Falls back to a static wrapped row when the visitor
    // prefers reduced motion.
    <Marquee className="py-2">
      <div className="flex items-center gap-14 pr-14 sm:gap-20 sm:pr-20">
        {partners.map((partner) => (
          <Image
            key={partner.id}
            src={partner.logoUrl}
            alt={partner.name}
            width={200}
            height={80}
            className={cx(
              "w-auto shrink-0 object-contain",
              SMALLER[partner.name] ? SMALLER_HEIGHT : DEFAULT_HEIGHT
            )}
          />
        ))}
      </div>
    </Marquee>
  );
}
