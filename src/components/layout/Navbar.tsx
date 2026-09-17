"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, LockKeyhole, Menu, Phone } from "lucide-react";
import { navigation, isExternal, routeHref } from "@/lib/navigation";
import MobileMenu from "./MobileMenu";
import { t } from "@/lib/copy";
import { iconFor } from "@/lib/icons";
import type { NavFeature } from "@/types";

export default function Navbar({
  whatsapp,
  phone,
}: {
  whatsapp: string;
  phone: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Thin progress bar along the bottom edge of the header.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.2 });

  // Shrink, blur and add a hairline once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close both menus whenever the route changes.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // The menu currently open, if any. The panel below the header renders from
  // this rather than from inside the list item that opened it.
  const openItem = navigation.find((item) => item.label === openMenu) ?? null;

  // True when the link points at the current page (or a section of it).
  // The path carries no language prefix, so the route compares directly.
  const isActive = (route: string) =>
    route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(route + "/");

  return (
    <>
      <header
        // Closing here rather than on <nav>: the panel is a child of the
        // header, so the pointer travelling from a button down into the panel
        // never leaves this element and the menu stays put.
        onMouseLeave={() => setOpenMenu(null)}
        className={
          // Not sticky itself — the wrapper in the site layout pins the
          // offer strip and this header together. `relative` keeps the reading
          // progress hairline positioned against the header.
          "relative w-full transition-[height,background-color,border-color,box-shadow] duration-300 " +
          (scrolled
            ? "border-b border-border bg-primary-50/80 shadow-soft backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-border bg-primary-50")
        }
      >
        <div
          className={
            "mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 transition-[height] duration-300 sm:px-8 lg:gap-10 lg:px-10 " +
            (scrolled ? "h-16" : "h-20")
          }
        >
          <Link href="/" className="flex shrink-0 items-center" aria-label="Somtel Somalia — home">
            <Image
              src="/assets/images/1.png"
              alt="Somtel Somalia"
              width={150}
              height={52}
              priority
              className={
                "w-auto transition-[height] duration-300 " +
                (scrolled ? "h-9" : "h-11")
              }
            />
          </Link>

          {/* Desktop navigation. Five top-level items, each with room to breathe;
              everything deeper lives in a mega-menu column. */}
          <nav
            className="hidden lg:block"
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpenMenu(null);
            }}
          >
            <ul className="flex items-center gap-2">
              {navigation.map((item) => {
                const active = isActive(item.route);

                if (!item.columns) {
                  return (
                    <li key={item.label}>
                      <Link
                        href={routeHref(item.route)}
                        className={
                          // Tighter at lg, where five items plus the logo and the actions only
                          // just fit; roomier again once there is width to spend.
                          "relative block rounded-full px-3.5 py-2.5 text-[15px] font-medium transition-colors duration-200 xl:px-5 " +
                          (active
                            ? "text-fg"
                            : "text-muted hover:bg-primary-50/70 hover:text-fg")
                        }
                      >
                        {item.label}
                        {active && <ActiveBar />}
                      </Link>
                    </li>
                  );
                }

                const open = openMenu === item.label;

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.label)}
                    // Opening on focus keeps the mega-menu reachable by keyboard.
                    onFocus={() => setOpenMenu(item.label)}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenMenu(open ? null : item.label)}
                      aria-expanded={open}
                      aria-haspopup="true"
                      className={
                        "relative flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[15px] font-medium transition-colors duration-200 xl:px-5 " +
                        (open || active
                          ? "text-fg"
                          : "text-muted hover:bg-primary-50/70 hover:text-fg")
                      }
                    >
                      {item.label}
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: reduce ? 0 : 0.2 }}
                        className="text-muted"
                      >
                        <ChevronDown size={15} />
                      </motion.span>
                      {active && <ActiveBar />}
                    </button>

                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              // Only once the row has room for it. At exactly the xl breakpoint the
              // number appeared and pushed the header four pixels past the viewport,
              // which is enough for a horizontal scrollbar on the whole page.
              className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-muted transition-colors duration-200 hover:text-fg 2xl:flex"
            >
              <Phone size={15} />
              {phone}
            </a>

            <Link
              href="/admin"
              title={t.nav.admin}
              aria-label={t.nav.admin}
              className="hidden items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-muted transition-colors duration-200 hover:text-fg lg:flex"
            >
              <LockKeyhole size={15} />
            </Link>


            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-accent-500 px-6 py-2.5 text-sm font-semibold text-primary-700 transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-400 hover:shadow-glow active:translate-y-px sm:inline-flex"
            >
              {t.nav.getInTouch}
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t.nav.openMenu}
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              className="rounded-full p-2.5 text-fg transition-colors hover:bg-primary-50 lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/*
          The mega-menu.

          One panel for the whole header rather than one per menu item, and it
          takes its width from the page container instead of from the button
          that opened it. A panel anchored to its button has nowhere to go: the
          menus on the right had no room left and ran off the edge of the
          screen — Business by 35px and Company by 156px at 1400px wide, which
          gave the whole page a sideways scrollbar. Anchored to the container,
          the columns simply lay out inside a width that always fits.

          It sits inside <header>, so moving the pointer from a button down
          into the panel never leaves the header and the menu does not flicker.
        */}
        <AnimatePresence>
          {openItem?.columns && (
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -6 }}
              transition={{ duration: reduce ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-50 hidden lg:block"
            >
              <div className="mx-auto w-full max-w-6xl px-5 pt-3 sm:px-8 lg:px-10">
                <motion.div
                  // One track per column, plus a fixed one for the feature card.
                  // Spelled out rather than left to auto-fit, which counts tracks
                  // by available width and had been making a sixth column, pushing
                  // the card onto a second row.
                  style={{
                    gridTemplateColumns:
                      `repeat(${openItem.columns.length}, minmax(0, 1fr))` +
                      (openItem.feature ? " 17rem" : ""),
                  }}
                  className="grid gap-x-10 gap-y-8 rounded-2xl border border-border bg-card/95 p-8 shadow-lift backdrop-blur-xl"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: reduce ? 0 : 0.04, delayChildren: 0.03 },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {openItem.columns.map((column) => (
                    <motion.div
                      key={column.title}
                      variants={{
                        hidden: { opacity: 0, y: reduce ? 0 : 8 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                      }}
                    >
                      <p className="eyebrow mb-4">{column.title}</p>
                      <ul className="space-y-1">
                        {column.links.map((link) => (
                          <li key={link.label + link.route}>
                            <MegaLink href={routeHref(link.route)}>{link.label}</MegaLink>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}

                  {openItem.feature && (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: reduce ? 0 : 8 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                      }}
                    >
                      <FeatureCard feature={openItem.feature} />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reading-progress hairline. Scales on the GPU, so it is cheap to animate. */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent-500"
        />
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        whatsapp={whatsapp}
      />
    </>
  );
}

/** The small yellow bar that marks the current page. */
function ActiveBar() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-x-5 -bottom-0.5 h-[3px] rounded-full bg-accent-500"
    />
  );
}

function MegaLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "block rounded-lg px-3 py-2.5 text-[15px] text-muted transition-colors duration-200 " +
    "hover:bg-primary-50 hover:text-fg";

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * The card that closes a mega-menu.
 *
 * The columns beside it are a plain list of destinations — deliberately quiet,
 * because a reader scanning them is looking for a name they already have in
 * mind. This is the opposite: one place worth going even if you were not
 * looking for it, so it gets the tint, the icon and the only arrow in the panel.
 */
function FeatureCard({ feature }: { feature: NavFeature }) {
  const Icon = iconFor(feature.icon);
  const external = isExternal(feature.route);

  const body = (
    <>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-500/20 text-primary-600">
        <Icon size={19} aria-hidden="true" />
      </span>

      <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {feature.eyebrow}
      </span>

      <span className="mt-1 block text-lg font-semibold text-fg">{feature.title}</span>

      <span className="mt-2 block text-[0.925rem] leading-relaxed text-muted">{feature.text}</span>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
        {feature.cta}
        <ArrowRight
          size={15}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </>
  );

  const className =
    "group flex h-full flex-col rounded-xl border border-border-strong bg-primary-50/50 p-5 " +
    "transition-[border-color,background-color] duration-200 hover:border-primary-400 hover:bg-primary-50";

  if (external) {
    return (
      <a href={feature.route} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    );
  }

  return (
    <Link href={routeHref(feature.route)} className={className}>
      {body}
    </Link>
  );
}
