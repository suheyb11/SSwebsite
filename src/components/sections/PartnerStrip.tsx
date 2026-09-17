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
  /** Empty until the real logo file arrives — see WordMark below. */
  logoUrl: string;
};

/**
 * Every logo occupies the same box.
 *
 * There used to be a per-name list of exceptions here, because rendering each
 * file at a fixed height with the width left to follow suits a wide wordmark
 * and leaves a round mark looking half the size beside it. The files are now
 * all centred on one 400x200 canvas by scripts/normalise-partner-logos.mjs, so
 * a single size covers every one of them and there is nothing to keep in step
 * by hand — a new partner needs no entry anywhere.
 */
const LOGO_BOX = "h-16 w-32 sm:h-20 sm:w-40";

export default function PartnerStrip({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;

  return (
    // Slow seamless strip. Falls back to a static wrapped row when the visitor
    // prefers reduced motion.
    <Marquee className="py-2">
      <div className="flex items-center gap-14 pr-14 sm:gap-20 sm:pr-20">
        {partners.map((partner) =>
          partner.logoUrl ? (
            <Image
              key={partner.id}
              src={partner.logoUrl}
              alt={partner.name}
              width={400}
              height={200}
              className={cx("shrink-0 object-contain", LOGO_BOX)}
            />
          ) : (
            <WordMark key={partner.id} name={partner.name} />
          )
        )}
      </div>
    </Marquee>
  );
}

/**
 * A partner whose logo file has not arrived yet.
 *
 * Set as type rather than drawn as a mark. Inventing a logo for a real company
 * would put a picture on the page that its owner never made and would not
 * recognise; a name set in the site's own face claims nothing it should not.
 * It sits at the same height as the logos so the row stays even, and swapping
 * in the real file later is one `logoUrl` away — nothing else changes.
 */
function WordMark({ name }: { name: string }) {
  return (
    <span
      className={cx(
        "flex shrink-0 items-center justify-center whitespace-nowrap text-center text-lg font-semibold tracking-tight text-primary-600 sm:text-xl",
        LOGO_BOX
      )}
    >
      {name}
    </span>
  );
}
