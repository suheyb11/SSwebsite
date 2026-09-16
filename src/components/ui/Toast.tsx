"use client";

// A small toast, written here rather than pulled in as a dependency.
//
// One at a time is enough for this site: a top-up either goes through or it
// does not, and stacking notifications would only bury the one that matters.
// It announces itself to screen readers through a live region, and it can be
// dismissed by hand as well as timing out.

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { cx } from "@/components/ui";

export type ToastTone = "success" | "error" | "info";

export type ToastMessage = {
  /** Changing this re-triggers the animation for a repeated message. */
  id: number;
  tone: ToastTone;
  title: string;
  body?: string;
};

const TONES: Record<ToastTone, { ring: string; icon: typeof Info; iconClass: string }> = {
  success: { ring: "border-accent-500", icon: CheckCircle2, iconClass: "text-accent-600" },
  error: { ring: "border-primary-400", icon: AlertTriangle, iconClass: "text-primary-600" },
  info: { ring: "border-border-strong", icon: Info, iconClass: "text-primary-600" },
};

export default function Toast({
  message,
  onDismiss,
  /** Errors stay longer, because they usually need reading twice. */
  duration,
}: {
  message: ToastMessage | null;
  onDismiss: () => void;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ms = duration ?? (message?.tone === "error" ? 9000 : 6000);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, ms);
    return () => clearTimeout(timer);
    // Keyed on the id so a repeated message restarts its own timer.
  }, [message?.id, ms, onDismiss, message]);

  const tone = TONES[message?.tone ?? "info"];
  const Icon = tone.icon;

  return (
    // The region stays mounted so assistive technology is listening before a
    // message ever arrives; announcing only works if the container pre-exists.
    // Top right, under the header, so it appears beside "Get in touch" rather
    // than at the foot of the page where it can be missed entirely. The offset
    // clears the sticky offer bar and menu above it.
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex justify-center px-4 pt-[7.5rem] sm:justify-end sm:px-6 sm:pt-32"
    >
      <AnimatePresence>
        {message && (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: reduce ? 0 : -16, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : -10, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: reduce ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cx(
              "pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border bg-white p-4 shadow-lift",
              tone.ring
            )}
          >
            <Icon size={20} className={cx("mt-0.5 shrink-0", tone.iconClass)} aria-hidden="true" />

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-fg">{message.title}</p>
              {message.body && (
                <p className="mt-1 text-[0.925rem] leading-relaxed text-muted">{message.body}</p>
              )}
            </div>

            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss"
              className="-m-1 shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-primary-50 hover:text-fg"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
