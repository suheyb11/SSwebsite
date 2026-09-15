"use client";

// Searchable list of Somtel shops and agents, filtered by city.
// The full list arrives from the server, so filtering never hits the network.

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin, Phone, Search, Store as StoreIcon } from "lucide-react";
import { Card, Section, SectionTitle, cx } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { t as copy } from "@/lib/copy";

export type StoreView = {
  id: number;
  name: string;
  city: string;
  region: string;
  address: string;
  hours: string;
  phone: string | null;
  kind: string;
};

export default function StoreLocator({ stores }: { stores: StoreView[] }) {
  const t = copy.stores;
  const common = copy.common;
  const [city, setCity] = useState<string>("all");
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  const cities = useMemo(
    () => Array.from(new Set(stores.map((s) => s.city))).sort(),
    [stores]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stores.filter((s) => {
      if (city !== "all" && s.city !== city) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
      );
    });
  }, [stores, city, query]);

  return (
    <Section id="store-locator">
      <SectionTitle eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <FadeIn className="mx-auto mb-10 max-w-3xl">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={common.search}
              className="field pl-11"
            />
          </div>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label={t.filterByCity}
            className="field sm:w-52"
          >
            <option value="all">{common.all}</option>
            {cities.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-4 text-sm text-muted">
          {results.length} {results.length === 1 ? t.resultCountOne : t.resultCount}
        </p>
      </FadeIn>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        {/* Results */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {results.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="surface p-8 text-center text-muted"
              >
                {t.noResults}
              </motion.p>
            ) : (
              results.map((store, i) => (
                <motion.div
                  key={store.id}
                  layout={!reduce}
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={{ duration: reduce ? 0.12 : 0.3, delay: reduce ? 0 : Math.min(i * 0.03, 0.2) }}
                >
                  <Card>
                    <div className="flex items-start gap-4">
                      <span
                        className={cx(
                          "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                          store.kind === "shop"
                            ? "bg-primary-600 text-white"
                            : "bg-accent-500/15 text-primary-600"
                        )}
                      >
                        <StoreIcon size={19} aria-hidden="true" />
                      </span>

                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-fg">{store.name}</h3>

                        <p className="mt-2 flex items-start gap-2 text-muted">
                          <MapPin size={16} className="mt-1 shrink-0 text-accent-500" aria-hidden="true" />
                          <span>
                            {store.address}, {store.city}
                          </span>
                        </p>

                        <p className="mt-1.5 flex items-center gap-2 text-muted">
                          <Clock size={16} className="shrink-0 text-accent-500" aria-hidden="true" />
                          {store.hours}
                        </p>

                        {store.phone && (
                          <p className="mt-1.5 flex items-center gap-2">
                            <Phone size={16} className="shrink-0 text-accent-500" aria-hidden="true" />
                            <a
                              href={`tel:${store.phone.replace(/[^+\d]/g, "")}`}
                              className="text-primary-600 transition-colors hover:text-accent-500"
                            >
                              {store.phone}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Map placeholder.
            TODO: swap for a real map once Store.lat / Store.lng are populated. */}
        <FadeIn delay={0.1} className="lg:sticky lg:top-28">
          <div className="surface relative grid h-[22rem] place-items-center overflow-hidden">
            <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-25" />
            <div className="relative text-center">
              <MapPin size={30} className="mx-auto text-accent-500" aria-hidden="true" />
              <p className="mt-4 font-medium text-fg">{t.mapPlaceholder}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
