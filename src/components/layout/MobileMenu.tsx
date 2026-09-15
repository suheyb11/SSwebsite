"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, LockKeyhole, X } from "lucide-react";
import { navigation, isExternal, routeHref } from "@/lib/navigation";
import { t } from "@/lib/copy";

/** Slide-in mobile navigation. Replaces the old react-burger-menu drawer. */
export default function MobileMenu({
  open,
  onClose,
  whatsapp,
}: {
  open: boolean;
  onClose: () => void;
  whatsapp: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduce = useReducedMotion();

  // Lock page scroll and allow Escape to close while the panel is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  // The links slide in one after another once the panel has settled.
  const list = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.045, delayChildren: reduce ? 0 : 0.12 } },
  };

  const row = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: 24 },
        show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
      };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-primary-900/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            id="mobile-menu"
            className="fixed right-0 top-0 z-50 flex h-full w-[min(23rem,88vw)] flex-col border-l border-border bg-card shadow-lift lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={
              reduce
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 320, damping: 34 }
            }
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <span className="eyebrow">{t.nav.menu}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.nav.closeMenu}
                className="rounded-full p-2 text-fg transition-colors hover:bg-primary-50"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <motion.ul variants={list} initial="hidden" animate="show" className="space-y-1">
                {navigation.map((item) => (
                  <motion.li key={item.label} variants={row}>
                    {item.columns ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                          aria-expanded={expanded === item.label}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left font-medium text-fg transition-colors hover:bg-primary-50"
                        >
                          {item.label}
                          <motion.span
                            animate={{ rotate: expanded === item.label ? 180 : 0 }}
                            transition={{ duration: reduce ? 0 : 0.2 }}
                            className="text-muted"
                          >
                            <ChevronDown size={18} />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {expanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-5 px-4 pb-4 pt-2">
                                {item.columns.map((column) => (
                                  <div key={column.title}>
                                    <p className="eyebrow mb-2">{column.title}</p>
                                    <ul className="space-y-0.5 border-l border-border pl-3.5">
                                      {column.links.map((link) => (
                                        <li key={link.label + link.route}>
                                          <MenuLink href={routeHref(link.route)} onClose={onClose}>
                                            {link.label}
                                          </MenuLink>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={routeHref(item.route)}
                        onClick={onClose}
                        className="block rounded-xl px-4 py-3.5 font-medium text-fg transition-colors hover:bg-primary-50"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            <div className="space-y-4 border-t border-border p-6">

              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-accent-500 px-6 py-3 text-center font-semibold text-primary-700 transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-400 hover:shadow-glow active:translate-y-px"
              >
                {t.nav.chatOnWhatsApp}
              </a>

              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center justify-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
              >
                <LockKeyhole size={14} />
                {t.nav.admin}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MenuLink({
  href,
  onClose,
  children,
}: {
  href: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const className =
    "block rounded-lg px-3 py-2.5 text-[15px] text-muted transition-colors hover:bg-primary-50 hover:text-fg";

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClose} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClose} className={className}>
      {children}
    </Link>
  );
}
