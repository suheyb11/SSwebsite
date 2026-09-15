"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

/** Job application form. Posts to /api/jobs/[slug]/apply. */
export default function ApplyForm({ slug, jobTitle }: { slug: string; jobTitle: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function update(field: "name" | "email" | "phone" | "message", value: string) {
    setForm({ ...form, [field]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`/api/jobs/${slug}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setFeedback(json.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("done");
      setFeedback("Application received. Our team will be in touch if you are shortlisted.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
      setFeedback("Could not reach the server. Please try again.");
    }
  }

  return (
    <form
      id="apply"
      onSubmit={handleSubmit}
      className="surface p-7 sm:p-9"
    >
      <h2 className="text-2xl font-semibold text-fg">Apply for this role</h2>
      <p className="mt-2 text-muted">{jobTitle}</p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="apply-name" className="field-label">
            Full name
          </label>
          <input
            id="apply-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="apply-email" className="field-label">
            Email address
          </label>
          <input
            id="apply-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="apply-phone" className="field-label">
            Phone number
          </label>
          <input
            id="apply-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+252 ..."
            className="field"
          />
        </div>

        <div>
          <label htmlFor="apply-message" className="field-label">
            Why are you a good fit?
          </label>
          <textarea
            id="apply-message"
            rows={6}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Tell us about your experience, and where we can find your CV."
            className="field"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 font-semibold text-white transition-[background-color,box-shadow,transform] duration-200 hover:bg-primary-700 hover:shadow-glow-navy active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? (
          <Loader2 size={18} className="animate-spin" />
        ) : status === "done" ? (
          <Check size={18} />
        ) : (
          <Send size={18} />
        )}
        {status === "sending" ? "Sending..." : "Submit application"}
      </button>

      {feedback && (
        <p
          role="status"
          className={
            "mt-4 text-sm font-medium " +
            (status === "error" ? "text-primary-700" : "text-primary-600")
          }
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
