"use client";

// The floating contact button in the bottom corner. Opens the three ways to
// reach Somtel: phone, WhatsApp, and the contact form.

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, MessageSquare, Phone, X } from "lucide-react";
import { t as copy } from "@/lib/copy";

export default function ContactLauncher({
  phone,
  whatsapp,
  email,
}: {
  phone: string;
  whatsapp: string;
  email: string;
}) {
  const t = copy.contact;
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Escape closes the panel, the same as every other overlay on the site.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const actions = [
    {
      Icon: Phone,
      label: t.call,
      value: phone,
      href: `tel:${phone.replace(/[^+\d]/g, "")}`,
      external: false,
    },
    {
      Icon: MessageCircle,
      label: t.whatsapp,
      value: "WhatsApp",
      href: whatsapp,
      external: true,
    },
    {
      Icon: MessageSquare,
      label: t.form,
      value: email,
      href: "/contact-us",
      external: false,
    },
  ].filter((a) => a.href);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: reduce ? 0 : 14, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.97 }}
            transition={{ duration: reduce ? 0.12 : 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="w-60 space-y-1.5 rounded-2xl border border-border bg-card/95 p-2 shadow-lift backdrop-blur-xl"
          >
            {actions.map(({ Icon, label, value, href, external }) => {
              const inner = (
                <>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-500/15 text-primary-600">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-fg">{label}</span>
                    <span className="block truncate text-sm text-muted">{value}</span>
                  </span>
                </>
              );

              const className =
                "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-primary-50";

              return (
                <li key={label}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                      onClick={() => setOpen(false)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={href} className={className} onClick={() => setOpen(false)}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={t.floatingLabel}
        aria-expanded={open}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-accent-500 text-primary-700 shadow-glow transition-colors hover:bg-accent-400"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="grid place-items-center"
        >
          {open ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.span>
      </motion.button>
    </div>
  );
}
