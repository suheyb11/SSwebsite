"use client";

// The promotional card shown shortly after a visitor arrives.
//
// Two rules keep it from being the kind of popup people resent:
//   - it waits a few seconds, so it never interrupts the first impression;
//   - closing it closes it for that visit.
//
// It reappears on a reload, which is what the client asked for: this is an
// advertisement, not a one-time notice. The layout only mounts once per full
// page load, so moving between pages in the site does not re-trigger it.
//
// It carries whatever the promo holds: a drawing, a picture, or a video — and a
// video still loads nothing until the visitor presses play.

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Illustration, { type IllustrationName } from "@/components/ui/Illustration";
import VideoPlayer from "@/components/sections/VideoPlayer";

export type PromoView = {
  id: number;
  title: string;
  text: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  /** "illus:name", "yt:id", "fb:url", or an image path under /public. */
  media: string | null;
  endsAt: string | null;
};

/** Long enough that the page has been read, short enough to still be seen. */
const DELAY_MS = 4000;

/**
 * How far down the page counts as "already reading".
 *
 * This is an arrival advert, so it should only ever appear on arrival. Without
 * this it fired four seconds in no matter what the visitor was doing, and on a
 * long page that meant it landed on top of whatever they had scrolled to — on a
 * blog post it covered the comments, and because it is a modal overlay it also
 * swallowed every Reply click underneath it.
 */
const SCROLLED_AWAY_PX = 400;

export default function PromoPopup({ promo }: { promo: PromoView }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (promo.endsAt && new Date(promo.endsAt).getTime() < Date.now()) return;

    // Someone who followed a link to a particular section — the comment count
    // on the blog index, say — came for that section. The browser's jump to the
    // anchor can land after this timer would have fired, so the scroll position
    // alone does not catch it; the hash does, and it is there from the start.
    if (window.location.hash) return;

    const timer = setTimeout(() => {
      // Where the reader is when the advert is due, rather than watching for
      // scrolling on the way there: if they have started reading, leave them be.
      if (window.scrollY <= SCROLLED_AWAY_PX) setOpen(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [promo.id, promo.endsAt]);

  // Escape closes it, like every other overlay on the site.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
  }

  const media = promo.media;
  const illustration = media?.startsWith("illus:")
    ? (media.slice("illus:".length) as IllustrationName)
    : null;
  const video = media && (media.startsWith("yt:") || media.startsWith("fb:") || media.endsWith(".mp4"));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-primary-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.25 }}
            onClick={close}
            aria-hidden="true"
          />

          {/*
            Centring is done by the flex parent rather than by a -50% translate.
            A translate centres a box of any height, including one taller than
            the screen — which on a phone pushes the top of the card off the
            viewport with no way to reach it. A padded flex container instead
            keeps the card inside the screen at every size, and the card scrolls
            internally if its content is long.
          */}
          <div className="fixed inset-0 z-[61] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={promo.title}
              initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg"
            >
              <div className="relative max-h-[88vh] overflow-y-auto overscroll-contain rounded-2xl border border-border-strong bg-bg shadow-lift">
                <button
                  type="button"
                  onClick={close}
                  aria-label={"Close"}
                  className="absolute right-3 top-3 z-10 rounded-full bg-bg/80 p-2 text-muted backdrop-blur transition-colors hover:bg-primary-50 hover:text-fg"
                >
                  <X size={18} />
                </button>

                {/* Media */}
                {video && media ? (
                  <VideoPlayer source={media} poster={null} label={promo.title} />
                ) : illustration ? (
                  <div className="relative bg-primary-700 py-5 sm:py-6">
                    <span aria-hidden="true" className="brand-mesh absolute inset-0 opacity-70" />
                    <Illustration
                      name={illustration}
                      tone="navy"
                      className="relative mx-auto max-w-[11rem] sm:max-w-[15rem]"
                    />
                  </div>
                ) : (
                  media && (
                    <Image
                      src={media}
                      alt=""
                      width={680}
                      height={340}
                      className="h-36 w-full object-cover sm:h-44"
                    />
                  )
                )}

                <div className="p-5 sm:p-7">
                  <h2 className="text-lg font-semibold text-fg sm:text-2xl">{promo.title}</h2>
                  {promo.text && <p className="mt-3 text-muted">{promo.text}</p>}

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    {promo.ctaLabel && promo.ctaHref && (
                      <Link
                        href={promo.ctaHref}
                        onClick={close}
                        className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 font-semibold text-primary-700 transition-[background-color,box-shadow] duration-200 hover:bg-accent-400 hover:shadow-glow"
                      >
                        {promo.ctaLabel}
                        <ArrowRight
                          size={17}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={close}
                      className="text-sm font-medium text-muted transition-colors hover:text-fg"
                    >
                      {"Not now"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
