"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { ChevronDown, LockKeyhole, Menu, Phone } from "lucide-react";
import { navigation, isExternal, routeHref } from "@/lib/navigation";
import MobileMenu from "./MobileMenu";
import { t } from "@/lib/copy";

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

  // True when the link points at the current page (or a section of it).
  // The path carries no language prefix, so the route compares directly.
  const isActive = (route: string) =>
    route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(route + "/");

  return (
    <>
      <header
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
            onMouseLeave={() => setOpenMenu(null)}
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
                          "relative block rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors duration-200 " +
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
                        "relative flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors duration-200 " +
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

                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: reduce ? 0 : 6, scale: reduce ? 1 : 0.99 }}
                          transition={{ duration: reduce ? 0.12 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                          // The padding doubles as a hover bridge between the
                          // button and the panel, so the menu does not flicker.
                          className="absolute left-1/2 top-full w-max -translate-x-1/2 pt-4"
                        >
                          <motion.div
                            className="flex gap-12 rounded-2xl border border-border bg-card/95 p-8 shadow-lift backdrop-blur-xl"
                            variants={{
                              hidden: {},
                              show: {
                                transition: { staggerChildren: reduce ? 0 : 0.04, delayChildren: 0.04 },
                              },
                            }}
                            initial="hidden"
                            animate="show"
                          >
                            {item.columns.map((column) => (
                              <motion.div
                                key={column.title}
                                className="min-w-[11rem]"
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
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-muted transition-colors duration-200 hover:text-fg xl:flex"
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
