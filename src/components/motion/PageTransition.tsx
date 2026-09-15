"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps page content so each route change fades in instead of snapping.
 * Keying on the pathname is what makes React remount (and re-animate) it.
 *
 * It also sends the reader back to the top when they move to another page,
 * which the App Router does not always do on its own.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    // Not on the first run. On a fresh load the browser has already decided
    // where the reader belongs — the top, or the anchor named in the URL — and
    // this effect runs late enough to overrule both. It was throwing anyone who
    // started scrolling during hydration straight back to the top, and it was
    // undoing the jump to #comments that a deep link had just made.
    const first = previous.current === null;
    const moved = previous.current !== pathname;
    previous.current = pathname;

    if (first || !moved) return;

    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
