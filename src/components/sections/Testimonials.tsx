"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";

export type TestimonialItem = {
  id: number;
  name: string;
  position: string | null;
  quote: string;
  imageUrl: string | null;
};

/** Auto-rotating testimonial carousel (the old one rotated every 5s too). */
export default function Testimonials({ items }: { items: TestimonialItem[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || items.length < 2) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [reduce, items.length]);

  if (items.length === 0) return null;

  const item = items[index];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative min-h-[22rem] sm:min-h-[19rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -16 }}
            transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            /* Glass panel: this sits on the navy band, so it borrows a little
               light from behind instead of being an opaque white slab. */
            className="rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-xl sm:p-11"
          >
            <Quote size={30} className="mx-auto mb-6 text-accent-500" aria-hidden="true" />

            <blockquote className="text-lg leading-relaxed text-white">{item.quote}</blockquote>

            <figcaption className="mt-8 flex flex-col items-center gap-3">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt=""
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-white">{item.name}</p>
                {item.position && <p className="text-sm text-white/60">{item.position}</p>}
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="mt-7 flex justify-center gap-2">
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${t.name}`}
              aria-current={i === index}
              className={
                "h-1.5 rounded-full transition-all duration-300 " +
                (i === index ? "w-9 bg-accent-500" : "w-1.5 bg-white/35")
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
