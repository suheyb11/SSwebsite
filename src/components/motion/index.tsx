"use client";

// Shared Framer Motion wrappers. Every animation on the site comes from here
// so timings and easing stay consistent.
//
// Two rules across this file:
//   1. Only `transform` and `opacity` are animated, so everything stays on the GPU.
//   2. Every wrapper checks `useReducedMotion()` and falls back to a plain fade.

import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Our standard easing curve — a soft, confident ease-out. */
const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared viewport settings: animate once, slightly before the element is centred. */
// No inset. With a negative margin an element sitting near the edge of the
// viewport never counts as "in view", so its reveal never fires and — because
// these start at opacity 0 — the content stays invisible rather than merely
// un-animated. Firing as soon as any part of it is on screen is the safer
// default; a reveal that runs slightly early costs nothing, one that never runs
// hides the page.
const VIEWPORT = { once: true, amount: 0 } as const;

/** Fades content in as it scrolls into view. Animates once. */
export function FadeIn({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Parent for a list/grid whose children should appear one after another. */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.07,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/** One child of a <Stagger>. */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

/** Lifts slightly on hover, presses down on tap. Used on cards. */
export function HoverLift({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -5 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animates a headline in word by word.
 * Each word gets its own span, so the stagger reads as the line assembling itself.
 */
export function AnimatedHeading({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : "0.5em" },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <motion.h1 className={className} variants={container} initial="hidden" animate="show">
      {words.map((w, i) => (
        // The wrapper clips the word as it slides up from below the line.
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

/**
 * Counts up to `value` when scrolled into view — used for stats.
 * Shows the final number immediately when reduced motion is on.
 */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1600,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Start at the real figure, not at zero.
  //
  // The server renders this too, so the correct number is in the HTML even
  // before JavaScript runs — and if the element never scrolls into view, or the
  // observer never fires, the reader still sees the true value rather than a
  // permanent 0. The count-down to zero happens in an effect after hydration,
  // so the first client render still matches the server.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) {
      // Not on screen yet: park at zero so there is something to count up from.
      if (!reduce) setDisplay(0);
      return;
    }

    if (reduce) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out so the number decelerates into its final value.
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(Math.round(value * eased));

      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * A seamless logo strip. Children are rendered twice so the track can loop
 * by translating exactly -50%. Pauses on hover and stops for reduced motion.
 */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    // No scrolling. The row keeps its own scrollbar so the page itself
    // never scrolls sideways on a narrow screen.
    return <div className={"overflow-x-auto " + (className ?? "")}>{children}</div>;
  }

  return (
    <div className={`marquee-mask overflow-hidden ${className ?? ""}`}>
      <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export { motion, useReducedMotion, EASE, VIEWPORT };

/**
 * Reveals an image with a slow settle: it eases up and scales back to its true
 * size, which reads as the picture arriving rather than blinking on.
 * `float` adds a continuous drift, used for cut-out product art with no frame.
 */
export function ImageReveal({
  children,
  className,
  float = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  float?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 26, scale: reduce ? 1 : 1.04 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0.2 : 0.75, delay, ease: EASE }}
    >
      {/* The float lives on an inner element so it cannot fight the reveal. */}
      <div className={float && !reduce ? "animate-float" : undefined}>{children}</div>
    </motion.div>
  );
}

/**
 * A springy nudge for an icon when its card is hovered.
 * Sits inside a `group`, so hovering anywhere on the card triggers it.
 */
export function IconPop({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        rest: { scale: 1, rotate: 0 },
        hover: { scale: 1.12, rotate: -6 },
      }}
      transition={{ type: "spring", stiffness: 420, damping: 14 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps a card so hovering it drives the child `IconPop`, lifts the card, and
 * settles with a spring. Replaces HoverLift where a card also has an icon.
 */
export function CardHover({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="rest"
      animate="rest"
      whileHover={reduce ? undefined : "hover"}
      variants={{ rest: { y: 0 }, hover: { y: -6 } }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Moves its children slowly as the page scrolls past, which gives a section a
 * sense of depth without anything jumping.
 *
 * `distance` is how far the element travels, in pixels, across the whole time it
 * is on screen — 40 is a gentle drift, 100 is obvious. Disabled entirely under
 * reduced motion, where it renders as a plain wrapper.
 */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Tracks this element from entering the viewport to leaving it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
