"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

/**
 * Newsletter signup. Posts to /api/subscribe.
 * `onDark` switches the styling for the navy footer.
 */
export default function NewsletterForm({ onDark = true }: { onDark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(json.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("done");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className={onDark ? "mb-3 text-sm text-white/70" : "mb-3 text-sm text-muted"}>
        Subscribe to keep up to date with everything Somtel.
      </p>

      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={
            "w-full rounded-full px-5 py-3 text-[15px] transition-colors focus:outline-none " +
            (onDark
              ? "border border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-accent-500 focus:bg-white/10"
              : "border border-border bg-bg text-fg placeholder:text-muted focus:border-primary-600")
          }
        />
        <button
          type="submit"
          disabled={status === "sending"}
          aria-label="Subscribe"
          className="shrink-0 rounded-full bg-accent-500 px-5 py-3 font-semibold text-primary-700 transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-400 hover:shadow-glow active:translate-y-px disabled:opacity-60"
        >
          {status === "sending" ? (
            <Loader2 size={18} className="animate-spin" />
          ) : status === "done" ? (
            <Check size={18} />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>

      {message && (
        <p
          role="status"
          className={
            "mt-3 text-sm " +
            (status === "error"
              ? onDark
                ? "text-accent-500"
                : "text-primary-700"
              : onDark
                ? "text-white/90"
                : "text-primary-600")
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}
