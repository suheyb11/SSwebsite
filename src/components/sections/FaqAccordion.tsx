"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

export type FaqItem = { id: number; question: string; answer: string };

/** Accordion FAQ list. Replaces the hand-rolled open/close markup on the old product pages. */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  // `null` means every panel is closed, matching the old behaviour.
  const [openId, setOpenId] = useState<number | null>(null);
  const reduce = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          // Each row is its own surface, so the open one visibly lifts off the page.
          <div
            key={item.id}
            className={
              "rounded-2xl border transition-[border-color,box-shadow,background-color] duration-300 " +
              (isOpen
                ? "border-border-strong bg-primary-50/40"
                : "border-border-strong bg-transparent hover:border-primary-400")
            }
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-medium text-fg"
              >
                <span>{item.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 " +
                    (isOpen
                      ? "bg-accent-500 text-primary-700"
                      : "bg-primary-50 text-primary-600")
                  }
                >
                  <Plus size={16} aria-hidden="true" />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 pr-14 text-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
