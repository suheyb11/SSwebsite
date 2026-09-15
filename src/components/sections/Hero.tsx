"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type HeroSlide = {
  id: number;
  title: string;
  subtitle: string | null;
  text: string | null;
  imageUrl: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
};

const EASE = [0.22, 1, 0.36, 1] as const;


/** Home hero. Framer Motion replaces the old owl.carousel slider. */
export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  // Auto-advance every 6s. Paused entirely for reduced-motion users.
  useEffect(() => {
    if (reduce || slides.length < 2) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [reduce, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[index];
  const go = (step: number) => setIndex((prev) => (prev + step + slides.length) % slides.length);

  // The headline reveals word by word. Splitting here keeps the markup readable.
  const headlineWords = [slide.title, slide.subtitle].filter(Boolean).join(" \n ").split(" ");

  return (
    <section
      className="relative isolate overflow-hidden bg-primary-50"
      aria-label="Highlights"
    >
      {/* Background image crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: "easeOut" }}
        >
          {slide.imageUrl && (
            <Image
              src={slide.imageUrl}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              /*
                These photographs are landscape with the subject right of
                centre. A phone shows a tall slice of that, and centring it puts
                the subject half outside the frame — you get an arm and no face.
                Biasing the crop right brings them back into view; from sm up
                there is room for the whole width, so it returns to centre.
              */
              className="object-cover object-[72%_center] sm:object-center"
            />
          )}
          {/* Readability wash — see .hero-wash in globals.css for why it is a
              stop-positioned gradient rather than Tailwind's from/via/to. */}
          <div className="hero-wash absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      {/* Slow navy-to-cyan mesh with a single yellow glow. Decorative only, and
          it sits still for reduced-motion users. */}
      <div
        aria-hidden="true"
        className={
          "brand-mesh pointer-events-none absolute inset-0 -z-10 opacity-20 [background-size:180%_180%] " +
          (reduce ? "" : "animate-gradientShift")
        }
      />

      {/*
        A floor under the height, so every slide is the same size.
        Without it the section is only as tall as the slide showing, and a slide
        whose supporting line wraps to one line instead of two makes the whole
        hero jump 28px each time the carousel reaches it. The values are the
        tallest slide measured at each breakpoint.
      */}
      <div className="mx-auto flex min-h-[30.5rem] w-full max-w-7xl items-center px-5 py-24 sm:min-h-[35.5rem] sm:px-8 sm:py-32 lg:min-h-[40.5rem] lg:px-10 lg:py-40">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={slide.id} initial="hidden" animate="show" exit="exit">
              <h1 className="text-display-sm font-semibold text-primary-700 sm:text-display-lg lg:text-display-xl">
                {headlineWords.map((word, i) =>
                  word === "\n" ? (
                    <br key={`br-${i}`} />
                  ) : (
                    // Each word sits in a clipping box so it rises out of nothing.
                    <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
                      <motion.span
                        className="inline-block"
                        variants={{
                          hidden: { y: reduce ? 0 : "0.55em", opacity: 0 },
                          show: {
                            y: 0,
                            opacity: 1,
                            transition: { duration: reduce ? 0.2 : 0.6, ease: EASE, delay: reduce ? 0 : i * 0.055 },
                          },
                          exit: { opacity: 0, transition: { duration: 0.2 } },
                        }}
                      >
                        {word}
                        {" "}
                      </motion.span>
                    </span>
                  )
                )}
              </h1>

              {slide.text && (
                <motion.p
                  className="mt-6 max-w-xl text-lg text-primary-700/75"
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 14 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: reduce ? 0.2 : 0.5, ease: EASE, delay: reduce ? 0 : 0.3 },
                    },
                    exit: { opacity: 0, transition: { duration: 0.2 } },
                  }}
                >
                  {slide.text}
                </motion.p>
              )}

              {slide.ctaLabel && slide.ctaHref && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 14 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: reduce ? 0.2 : 0.5, ease: EASE, delay: reduce ? 0 : 0.42 },
                    },
                    exit: { opacity: 0, transition: { duration: 0.2 } },
                  }}
                >
                  <Link
                    href={slide.ctaHref}
                    className="group mt-9 inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-primary-700 transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-400 hover:shadow-glow active:translate-y-px"
                  >
                    {slide.ctaLabel}
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          {/* Prev / next */}
          <div className="absolute bottom-8 right-5 flex gap-2 sm:right-8 lg:right-10">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-primary-700/10 bg-white/70 text-primary-700 backdrop-blur transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-500"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-primary-700/10 bg-white/70 text-primary-700 backdrop-blur transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-500"
            >
              <ChevronRight size={19} />
            </button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-8 left-5 flex items-center gap-2 sm:left-8 lg:left-10">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={
                  "h-1.5 rounded-full transition-all duration-300 " +
                  (i === index ? "w-9 bg-accent-500" : "w-1.5 bg-primary-700/25")
                }
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
