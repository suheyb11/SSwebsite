"use client";

// Top up / self recharge.
//
// Every "Buy now" on the site lands here, carrying the choice in the URL
// (?service=Kaafiye&plan=Weekly&amount=3), so the panel opens already filled in.
//
// Two modes: topping up your own line, or someone else's. Either way the wallet
// charged is the one whose number and PIN are given.
//
// Confirming posts to /api/topup, which is where the payment provider is called
// from. The key stays on the server, and the PIN is passed straight through to
// the provider — never stored, never logged, and cleared from the form as soon
// as the request returns.

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Eye, EyeOff, KeyRound, Phone, User, Users } from "lucide-react";
import { Button, Card, Section, SectionTitle, cx } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import Toast, { type ToastMessage } from "@/components/ui/Toast";
import Glyph from "@/components/ui/Glyph";
import { iconFor } from "@/lib/icons";
import { t as strings } from "@/lib/copy";
import { MSISDN_HINT, isSomtelNumber, normaliseMsisdn } from "@/lib/msisdn";

/** What a customer can top up. */
type Service = {
  id: string;
  label: string;
  icon: string;
  /** Set when the service cannot be paid for from a handset balance. */
  offline?: boolean;
};

const SERVICES: Service[] = [
  { id: "airtime", label: "Airtime", icon: "Wallet" },
  { id: "data", label: "Data bundle", icon: "Signal" },
  { id: "Muraadso", label: "Muraadso", icon: "PhoneCall" },
  { id: "Akram", label: "Akram Voice", icon: "Clock" },
  { id: "Kaafiye", label: "Kaafiye Plus", icon: "CheckCircle2" },
  { id: "Dhameys", label: "Dhamays Plus", icon: "Tv" },
  {
    id: "fiberoptic",
    label: "Fiber / Home internet",
    icon: "Wifi",
    // A fibre account is billed to an address rather than to a handset.
    offline: true,
  },
];

const CURRENCIES = [
  { code: "USD", label: "Dollar", symbol: "$" },
  { code: "SOS", label: "Shilling", symbol: "Sh" },
] as const;

type CurrencyCode = (typeof CURRENCIES)[number]["code"];

/**
 * Quick amounts, per currency.
 *
 * TODO: the shilling figures are a guess at sensible denominations — send the
 * ones Somtel actually sells and they drop straight in. Nothing is blocked by
 * this meanwhile: the amount box takes any figure.
 */
const QUICK_AMOUNTS: Record<CurrencyCode, string[]> = {
  USD: ["0.25", "0.5", "1", "3", "5", "10", "20"],
  SOS: ["5000", "10000", "25000", "50000", "100000"],
};

export default function SelfRecharge({ phone }: { phone: string }) {
  // useSearchParams needs a Suspense boundary for the page to stay static.
  return (
    <Suspense fallback={null}>
      <RechargePanel phone={phone} />
    </Suspense>
  );
}

function RechargePanel({ phone }: { phone: string }) {
  const t = strings.topup;
  const common = strings.common;
  const reduce = useReducedMotion();
  const params = useSearchParams();

  const [mode, setMode] = useState<"self" | "other">("self");
  const [service, setService] = useState(SERVICES[0].id);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [amount, setAmount] = useState("3");
  const [msisdn, setMsisdn] = useState("");
  const [recipient, setRecipient] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // The plan the visitor clicked, if they came from a bundle card.
  const plan = params.get("plan");
  const fromService = params.get("service");
  const fromAmount = params.get("amount");

  useEffect(() => {
    if (fromService && SERVICES.some((s) => s.id === fromService)) setService(fromService);
    if (fromAmount) setAmount(fromAmount);
  }, [fromService, fromAmount]);

  const active = SERVICES.find((s) => s.id === service) ?? SERVICES[0];
  const money = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];

  const payerDigits = normaliseMsisdn(msisdn);
  const recipientDigits = normaliseMsisdn(recipient);
  const pinDigits = pin.replace(/[^\d]/g, "");
  const value = Number(amount);

  // Only complain once someone has typed enough to be worth judging — an error
  // on an empty box is just noise.
  const payerBad = msisdn.trim().length > 3 && !isSomtelNumber(msisdn);
  const recipientBad = recipient.trim().length > 3 && !isSomtelNumber(recipient);

  // Topping up "someone else" with your own number is a mistake, not a payment.
  const sameNumber =
    mode === "other" && payerDigits.length === 9 && payerDigits === recipientDigits;

  const ready =
    isSomtelNumber(msisdn) &&
    (mode === "self" || (isSomtelNumber(recipient) && !sameNumber)) &&
    pinDigits.length >= 4 &&
    Number.isFinite(value) &&
    value > 0 &&
    !active.offline;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!ready || pending) return;

    setPending(true);

    try {
      // The browser posts to our own route, which holds the provider's key and
      // makes the charge. Nothing about the provider reaches the page.
      const response = await fetch("/api/topup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode,
          service: active.id,
          plan,
          currency,
          amount,
          msisdn: payerDigits,
          recipient: mode === "other" ? recipientDigits : payerDigits,
          pin: pinDigits,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { data?: { message?: string; reference?: string | null }; error?: string | null }
        | null;

      if (!response.ok || payload?.error) {
        setToast({
          id: Date.now(),
          // 503 means the provider is not connected yet — a state of the setup
          // rather than something the customer did wrong.
          tone: response.status === 503 ? "info" : "error",
          title: response.status === 503 ? "Payments not connected yet" : "Top-up failed",
          body: payload?.error ?? "Something went wrong. Nothing was charged.",
        });
        return;
      }

      setReference(payload?.data?.reference ?? null);
      setSent(true);
      setToast({
        id: Date.now(),
        tone: "success",
        title: `${money.symbol}${amount} ${active.label} requested`,
        body: payload?.data?.message ?? "Approve it on your handset to finish.",
      });
    } catch {
      setToast({
        id: Date.now(),
        tone: "error",
        title: "No connection",
        body: "We could not reach the server. Nothing was charged — please try again.",
      });
    } finally {
      // The PIN never lingers in the form, whatever the outcome.
      setPin("");
      setPending(false);
    }
  }

  const label = {
    title: "Top up your line",
    lead: "Choose what you are paying for, enter the number, and confirm.",
    what: "What are you topping up?",
    number: mode === "self" ? "Your Somtel number" : "Your number (paying)",
    recipient: "Number receiving the top-up",
    currency: "Currency",
    amount: "Amount",
    pin: "eDahab PIN",
    summary: "Your order",
    pay: "Continue to payment",
    enter: "Fill in the form to continue.",
    selected: "You selected",
    offline:
      "A fibre account is billed to an address, not a handset. Pay through the eDahab app or at any Somtel outlet.",
    sentTitle: "Request received",
    sentBody: "Approve it on the handset to finish.",
    again: "Start another top-up",
    help: `Need a hand? Call us on ${phone}.`,
  };

  const MODES = [
    { id: "self" as const, label: "Self recharge", Icon: User },
    { id: "other" as const, label: "Other", Icon: Users },
  ];

  return (
    <Section id="recharge" tone="muted">
      <SectionTitle eyebrow={t.eyebrow} title={label.title} description={label.lead} />

      {/* Whose line is being topped up. Everything below follows from this. */}
      <div className="mx-auto mb-8 flex max-w-4xl justify-center">
        <div
          role="tablist"
          aria-label="Who are you topping up?"
          className="inline-flex rounded-full border border-border-strong bg-white p-1"
        >
          {MODES.map(({ id, label: text, Icon }) => {
            const on = mode === id;

            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setMode(id)}
                className={cx(
                  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200",
                  on ? "bg-primary-600 text-white" : "text-muted hover:text-fg"
                )}
              >
                <Icon size={16} aria-hidden="true" />
                {text}
              </button>
            );
          })}
        </div>
      </div>

      {/* What the visitor clicked on the way here. */}
      <AnimatePresence>
        {plan && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-8 max-w-4xl"
          >
            <p className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-accent-500 bg-accent-500/10 px-5 py-3 text-center text-[0.95rem]">
              <Check size={17} className="text-primary-700" aria-hidden="true" />
              <span className="font-semibold text-fg">{label.selected}:</span>
              <span className="text-fg">
                {active.label} — {plan}
                {fromAmount && ` · ${money.symbol}${fromAmount}`}
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={submit} className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
        {/* Choices */}
        <FadeIn>
          <Card interactive={false} className="h-full">
            <p className="field-label">{label.what}</p>
            <div role="group" aria-label={label.what} className="flex flex-wrap gap-2">
              {SERVICES.map((s) => {
                const on = s.id === service;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setService(s.id)}
                    aria-pressed={on}
                    className={cx(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color] duration-200",
                      on
                        ? "border-accent-500 bg-accent-500 text-primary-700"
                        : "border-border-strong text-muted hover:border-primary-400 hover:text-fg"
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            <label htmlFor="recharge-number" className="field-label mt-7">
              {label.number}
            </label>
            <div className="relative">
              <Phone
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="recharge-number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
                placeholder="+252 6xx xxx xxx"
                aria-invalid={payerBad}
                aria-describedby={payerBad ? "recharge-number-error" : undefined}
                className={cx("field pl-11", payerBad && "border-primary-400")}
              />
            </div>
            {payerBad && (
              <p id="recharge-number-error" role="alert" className="mt-2 text-sm text-primary-600">
                {MSISDN_HINT}
              </p>
            )}

            {/* Only when paying for somebody else. */}
            <AnimatePresence initial={false}>
              {mode === "other" && (
                <motion.div
                  initial={{ opacity: 0, height: reduce ? "auto" : 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: reduce ? "auto" : 0 }}
                  transition={{ duration: reduce ? 0.12 : 0.22 }}
                  className="overflow-hidden"
                >
                  <label htmlFor="recharge-recipient" className="field-label mt-6">
                    {label.recipient}
                  </label>
                  <div className="relative">
                    <Users
                      size={17}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    />
                    <input
                      id="recharge-recipient"
                      type="tel"
                      inputMode="tel"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="+252 6xx xxx xxx"
                      aria-invalid={recipientBad || sameNumber}
                      className={cx("field pl-11", (recipientBad || sameNumber) && "border-primary-400")}
                    />
                  </div>
                  {(recipientBad || sameNumber) && (
                    <p role="alert" className="mt-2 text-sm text-primary-600">
                      {sameNumber
                        ? "That is the same number you are paying from. Use Self recharge instead."
                        : MSISDN_HINT}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 grid gap-4 sm:grid-cols-[9rem_1fr]">
              <div>
                <label htmlFor="recharge-currency" className="field-label">
                  {label.currency}
                </label>
                <select
                  id="recharge-currency"
                  value={currency}
                  onChange={(e) => {
                    const next = e.target.value as CurrencyCode;
                    setCurrency(next);
                    // A dollar figure means nothing in shillings, so move to
                    // that currency's first quick amount rather than keeping it.
                    setAmount(QUICK_AMOUNTS[next][0]);
                  }}
                  className="field"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="recharge-amount" className="field-label">
                  {label.amount} ({money.code})
                </label>
                <input
                  id="recharge-amount"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                  className="field"
                />
              </div>
            </div>

            <div role="group" aria-label={label.amount} className="mt-3 flex flex-wrap gap-2">
              {QUICK_AMOUNTS[currency].map((quick) => {
                const on = quick === amount;

                return (
                  <button
                    key={quick}
                    type="button"
                    onClick={() => setAmount(quick)}
                    aria-pressed={on}
                    className={cx(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color] duration-200",
                      on
                        ? "border-accent-500 bg-accent-500 text-primary-700"
                        : "border-border-strong text-muted hover:border-primary-400 hover:text-fg"
                    )}
                  >
                    {money.symbol}
                    {quick}
                  </button>
                );
              })}
            </div>

            <label htmlFor="recharge-pin" className="field-label mt-7">
              {label.pin}
            </label>
            <div className="relative">
              <KeyRound
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="recharge-pin"
                type={showPin ? "text" : "password"}
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="••••"
                className="field pl-11 pr-12 tracking-[0.4em]"
              />
              <button
                type="button"
                onClick={() => setShowPin((on) => !on)}
                aria-label={showPin ? "Hide PIN" : "Show PIN"}
                aria-pressed={showPin}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted transition-colors hover:bg-primary-50 hover:text-fg"
              >
                {showPin ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">
              Used once to authorise this payment and not saved anywhere.
            </p>
          </Card>
        </FadeIn>

        {/* Order and payment */}
        <FadeIn delay={0.1}>
          <Card emphasis="feature" interactive={false} className="flex h-full flex-col">
            <div className="flex items-center gap-3">
              <Glyph Icon={iconFor(active.icon)} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {label.summary}
                </p>
                <p className="font-semibold text-fg">{active.label}</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0.12 : 0.25 }}
                  className="flex flex-1 flex-col"
                >
                  <p className="mt-6 flex items-center gap-2 text-lg font-semibold text-fg">
                    <Check size={20} className="text-accent-600" aria-hidden="true" />
                    {label.sentTitle}
                  </p>

                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{label.sentBody}</p>

                  <div className="mt-5 rounded-xl border border-border-strong bg-primary-50/50 p-4 text-sm text-fg">
                    <span className="font-semibold">
                      {money.symbol}
                      {amount} · {active.label}
                    </span>
                    <span className="mt-1 block text-muted">
                      {mode === "other" ? `${recipient} (from ${msisdn})` : msisdn}
                    </span>
                    {reference && (
                      <span className="mt-2 block font-mono text-xs text-muted">Ref {reference}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 self-start text-[0.95rem] font-semibold text-primary-600 transition-colors hover:text-accent-600"
                  >
                    {label.again}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="order"
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0.12 : 0.25 }}
                  className="flex flex-1 flex-col"
                >
                  <p className="mt-6 text-3xl font-semibold tracking-tight text-fg">
                    {money.symbol}
                    {amount || "0"}
                  </p>
                  <p className="mt-1 text-muted">
                    {active.label}
                    {plan ? ` — ${plan}` : ""}
                  </p>

                  <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-[0.95rem]">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">{mode === "self" ? "Line" : "Paying from"}</dt>
                      <dd className="font-medium text-fg">{msisdn || "—"}</dd>
                    </div>
                    {mode === "other" && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted">Receiving</dt>
                        <dd className="font-medium text-fg">{recipient || "—"}</dd>
                      </div>
                    )}
                  </dl>

                  {active.offline ? (
                    <p className="mt-5 text-[0.95rem] text-muted">{label.offline}</p>
                  ) : (
                    <div className="mt-6">
                      <Button type="submit" disabled={!ready || pending}>
                        {pending ? "Sending…" : label.pay}
                        {!pending && <ArrowRight size={17} />}
                      </Button>
                      {!ready && <p className="mt-3 text-sm text-muted">{label.enter}</p>}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 border-t border-border pt-5 text-sm text-muted">
              {label.help}{" "}
              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                className="font-medium text-primary-600 transition-colors hover:text-accent-500"
              >
                {common.contactUs}
                <ArrowRight size={13} className="ml-1 inline" aria-hidden="true" />
              </a>
            </p>
          </Card>
        </FadeIn>
      </form>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </Section>
  );
}
