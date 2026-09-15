"use client";

// Type a city, see what Somtel runs there. The whole coverage list is passed in
// from the server, so the search is instant and works with no network calls.

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Antenna, MapPin, Search, X } from "lucide-react";
import { Badge, Card, Section, SectionTitle } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { t as copy } from "@/lib/copy";

export type CoverageOption = {
  id: number;
  city: string;
  region: string;
  services: string[];
  note: string | null;
};

export default function CoverageChecker({
  areas,
}: {
  areas: CoverageOption[];
}) {
  const t = copy.coverage;
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CoverageOption | null>(null);
  const reduce = useReducedMotion();

  // Suggestions only appear once the visitor has typed something.
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return areas
      .filter((a) => a.city.toLowerCase().includes(q) || a.region.toLowerCase().includes(q))
      .slice(0, 6);
  }, [areas, query]);

  const searched = query.trim().length > 0;

  return (
    <Section tone="muted" id="coverage-checker">
      <SectionTitle eyebrow={t.checkerEyebrow} title={t.checkerTitle} description={t.checkerDescription} />

      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <label htmlFor="coverage-city" className="field-label">
            {t.selectCity}
          </label>

          <div className="relative">
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              id="coverage-city"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(null);
              }}
              placeholder={t.searchPlaceholder}
              className="field pl-11 pr-11"
            />
            {searched && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelected(null);
                }}
                aria-label={copy.common.clear}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted transition-colors hover:text-fg"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </FadeIn>

        {/* Suggestions */}
        <AnimatePresence mode="wait">
          {searched && !selected && (
            <motion.ul
              key="suggestions"
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.12 : 0.24 }}
              className="mt-3 space-y-2"
            >
              {matches.length === 0 ? (
                <li className="surface p-6 text-center">
                  <p className="font-medium text-fg">{t.noMatch}</p>
                  <p className="mt-1.5 text-muted">{t.noMatchHelp}</p>
                </li>
              ) : (
                matches.map((area) => (
                  <li key={area.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(area)}
                      className="surface flex w-full items-center gap-3 p-4 text-left transition-[border-color,background-color] duration-200 hover:border-primary-400 hover:bg-primary-50/40"
                    >
                      <MapPin size={17} className="shrink-0 text-accent-500" aria-hidden="true" />
                      <span className="font-medium text-fg">{area.city}</span>
                      <span className="ml-auto text-sm text-muted">{area.region}</span>
                    </button>
                  </li>
                ))
              )}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
            >
              <Card interactive={false}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {t.available}
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-fg">{selected.city}</p>
                    <p className="mt-1 text-muted">
                      {t.region}: {selected.region}
                    </p>
                  </div>
                  <Antenna size={22} className="mt-1 shrink-0 text-accent-500" aria-hidden="true" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {t.servicesLive}
                </p>

                {/* Each badge pops in after the card has settled. */}
                <motion.div
                  className="mt-3 flex flex-wrap gap-2"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.15 } } }}
                >
                  {selected.services.map((service) => (
                    <motion.span
                      key={service}
                      variants={{
                        hidden: { opacity: 0, scale: reduce ? 1 : 0.85 },
                        show: { opacity: 1, scale: 1 },
                      }}
                    >
                      <Badge tone="accent">{service}</Badge>
                    </motion.span>
                  ))}
                </motion.div>

                {selected.note && <p className="mt-6 text-muted">{selected.note}</p>}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
