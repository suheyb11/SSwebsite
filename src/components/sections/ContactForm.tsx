"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

/** Contact form. Posts to /api/contact, which saves a ContactMessage row. */
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function update(field: "name" | "email" | "message", value: string) {
    setForm({ ...form, [field]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
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
      setFeedback("Thanks for reaching out — we'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setFeedback("Could not reach the server. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="surface p-7 sm:p-9">
      <h2 className="text-2xl font-semibold text-fg">Send Message</h2>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="field-label">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="field-label">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={6}
            required
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Write a message"
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
        {status === "sending" ? "Sending..." : "Send Message"}
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
