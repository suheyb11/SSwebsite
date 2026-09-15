"use client";

// A video that costs nothing until someone wants to watch it.
//
// The page renders only a poster and a play button — no <video> source, no
// YouTube script, no third-party request. The real player is inserted on click.
// That matters here more than on most sites: the visitor is likely on mobile
// data, and a hero video that autoloads would spend their bundle for them.

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { cx } from "@/components/ui";
import Illustration, { type IllustrationName } from "@/components/ui/Illustration";

export default function VideoPlayer({
  /** A path under /public, "yt:<id>" for YouTube, or "fb:<url>" for Facebook. */
  source,
  /** Drawn behind the play button until the video starts. */
  poster,
  label,
  meta,
}: {
  source: string;
  poster?: string | null;
  label: string;
  /** Length and weight, shown under the play button before anything downloads. */
  meta?: string | null;
}) {
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  const youtube = source.startsWith("yt:") ? source.slice(3) : null;

  // Facebook's public video plugin. It needs no app token for a public video —
  // just the post URL, encoded.
  const facebook = source.startsWith("fb:")
    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        source.slice(3)
      )}&show_text=false&autoplay=true`
    : null;
  const illustration = poster?.startsWith("illus:")
    ? (poster.slice("illus:".length) as IllustrationName)
    : null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-primary-700">
      {/* 16:9 keeps the box the right height before anything loads, so nothing
          shifts when the player appears. */}
      <div className="aspect-video w-full">
        {playing ? (
          youtube || facebook ? (
            <iframe
              // autoplay is safe here: it only runs because the visitor clicked.
              src={
                youtube
                  ? `https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`
                  : (facebook as string)
              }
              title={label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          ) : (
            <video
              src={source}
              controls
              autoPlay
              playsInline
              preload="none"
              className="h-full w-full bg-primary-900 object-contain"
            >
              {label}
            </video>
          )
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative grid h-full w-full place-items-center"
            aria-label={label}
          >
            <span aria-hidden="true" className="brand-mesh absolute inset-0 opacity-80" />

            {illustration && (
              <span aria-hidden="true" className="absolute inset-0 grid place-items-center opacity-40">
                <Illustration name={illustration} tone="navy" className="max-w-[18rem]" />
              </span>
            )}

            <motion.span
              className={cx(
                "relative grid h-20 w-20 place-items-center rounded-full bg-accent-500",
                "text-primary-700 shadow-glow"
              )}
              whileHover={reduce ? undefined : { scale: 1.08 }}
              whileTap={reduce ? undefined : { scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
            >
              {/* A slow ring pushing outwards, so the button reads as "press me". */}
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border-2 border-accent-500"
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <Play size={28} className="ml-1 fill-current" aria-hidden="true" />
            </motion.span>

            <span className="relative mt-6 max-w-md px-6 text-center text-lg font-semibold text-white">
              {label}
            </span>

            {meta && (
              <span className="relative mt-2 text-sm text-white/70">{meta}</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
