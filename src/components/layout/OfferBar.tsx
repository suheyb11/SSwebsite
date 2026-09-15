"use client";

// A slim strip above the navbar carrying the current offer, with the time left
// on it counting down.
//
// The countdown is the point: "20% off bundles" says nothing about urgency, but
// "4 days 6 hours left" tells the reader whether they need to act today. It is
// computed on the client, because a server-rendered figure would be stale the
// moment it was cached.

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export type OfferView = {
  id: number;
  title: string;
  text: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  /** ISO string; the bar hides itself once this passes. */
  endsAt: string | null;
};

/** Per-offer, so a new offer shows again even if the last one was dismissed. */
const dismissKey = (id: number) => `somtel-offer-${id}`;

function remaining(endsAt: string | null) {
  if (!endsAt) return null;

  const ms = new Date(endsAt).getTime() - Date.now();
  if (ms <= 0) return null;

  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
  };
}

export default function OfferBar({ offer }: { offer: OfferView }) {
  // Hidden until mounted: the dismissal lives in localStorage, and rendering the
  // bar on the server would flash it up for someone who closed it days ago.
  const [shown, setShown] = useState(false);
  const [left, setLeft] = useState<ReturnType<typeof remaining>>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    try {
      if (localStorage.getItem(dismissKey(offer.id))) return;
    } catch {
      // Storage blocked — showing the bar is the safer default.
    }

    const tick = () => {
      const next = remaining(offer.endsAt);
      setLeft(next);
      // An offer with an end date that has passed simply stops appearing.
      setShown(offer.endsAt ? next !== null : true);
    };

    tick();
    const timer = setInterval(tick, 30_000);
    return () => clearInterval(timer);
  }, [offer.id, offer.endsAt]);

  function dismiss() {
    setShown(false);
    try {
      localStorage.setItem(dismissKey(offer.id), "1");
    } catch {
      // Nothing to do — it will simply show again next visit.
    }
  }

  const unit = {
    day: "days",
    hour: "hrs",
    minute: "min",
    left: "left",
    close: "Dismiss",
  };

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden border-b border-border bg-white text-fg"
        >
          {/* A whisper of brand colour at the left edge, nothing more. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgb(254 217 0 / 0.16) 0%, rgb(254 217 0 / 0.05) 28%, transparent 60%)",
            }}
          />

          <div className="relative mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-12 py-2.5 text-sm sm:px-14">
            <p className="font-semibold text-primary-700">{offer.title}</p>

            {offer.text && <p className="hidden text-muted sm:block">{offer.text}</p>}

            {left && (
              <p className="flex items-center gap-1.5 font-medium">
                {left.days > 0 && (
                  <Count value={left.days} unit={unit.day} />
                )}
                <Count value={left.hours} unit={unit.hour} />
                {left.days === 0 && <Count value={left.minutes} unit={unit.minute} />}
                <span className="text-muted">{unit.left}</span>
              </p>
            )}

            {offer.ctaLabel && offer.ctaHref && (
              <Link
                href={offer.ctaHref}
                className="group inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-4 py-1 font-semibold text-primary-700 transition-colors hover:bg-accent-400"
              >
                {offer.ctaLabel}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={dismiss}
            aria-label={unit.close}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted transition-colors hover:bg-primary-50 hover:text-fg"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** One number-and-unit pair in the countdown. */
function Count({ value, unit }: { value: number; unit: string }) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="rounded bg-primary-700 px-1.5 py-0.5 font-mono font-semibold tabular-nums text-white">
        {value}
      </span>
      <span className="text-muted">{unit}</span>
    </span>
  );
}
