// The icon chip used on every card across the site.
//
// It was copied inline into nine files, which meant the size, the tint and the
// hover behaviour drifted apart. One component keeps them identical — and gives
// every icon the same springy nudge when its card is hovered.

import type { LucideIcon } from "lucide-react";
import { IconPop } from "@/components/motion";
import { cx } from "@/components/ui";

export default function Glyph({
  Icon,
  size = "md",
  tone = "accent",
  className,
}: {
  Icon: LucideIcon;
  size?: "md" | "lg";
  /** `accent` is the tinted yellow chip; `solid` is the filled navy one. */
  tone?: "accent" | "solid";
  className?: string;
}) {
  const box = size === "lg" ? "h-14 w-14" : "h-11 w-11";

  const tones = {
    accent: "bg-accent-500/15 text-primary-600",
    solid: "bg-primary-600 text-white",
  };

  return (
    <IconPop className={cx("grid shrink-0 place-items-center rounded-xl", box, tones[tone], className)}>
      <Icon size={size === "lg" ? 24 : 20} aria-hidden="true" />
    </IconPop>
  );
}
