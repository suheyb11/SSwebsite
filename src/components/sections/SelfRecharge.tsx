"use client";

// Self recharge / top up.
//
// There is no payment gateway behind the site, so "Buy now" cannot take money.
// What it can do is everything short of that: remember what the customer picked,
// take their number, and hand them the exact USSD string their handset needs —
// as a `tel:` link, so on a phone one tap dials it.
//
// Arriving from a plan card carries the choice through the URL
// (?service=Kaafiye&plan=Weekly&amount=3), so the panel opens already filled in.

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Copy, Phone, Smartphone } from "lucide-react";
import { Button, Card, Section, SectionTitle, cx } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import Glyph from "@/components/ui/Glyph";
import { iconFor } from "@/lib/icons";
import { t as strings } from "@/lib/copy";

/**
 * What a customer can top up, and the self-service string each one uses.
 *
 * TODO: replace every `code` below with the real Somtel USSD pattern. The shapes
 * are placeholders — only the flow around them is finished.
 */
type Service = {
  id: string;
  label: string;
  icon: string;
  /** Builds the string to dial. `amount` is in USD, `msisdn` is digits only. */
  code: (amount: string, msisdn: string) => string;
  /** Set when the service cannot be self-served from a handset. */
  offline?: boolean;
};

const SERVICES: Service[] = [
  {
    id: "airtime",
    label: "Airtime",
    icon: "Wallet",
    code: (a, m) => `*100*${a}*${m}#`,
  },
  {
    id: "data",
    label: "Data bundle",
    icon: "Signal",
    code: (a, m) => `*100*1*${a}*${m}#`,
  },
  {
    id: "Muraadso",
    label: "Muraadso",
    icon: "PhoneCall",
    code: (a, m) => `*555*1*${a}*${m}#`,
  },
  {
    id: "Akram",
    label: "Akram Voice",
    icon: "Clock",
    code: (a, m) => `*555*2*${a}*${m}#`,
  },
  {
    id: "Kaafiye",
    label: "Kaafiye Plus",
    icon: "CheckCircle2",
    code: (a, m) => `*555*3*${a}*${m}#`,
  },
  {
    id: "Dhameys",
    label: "Dhamays Plus",
    icon: "Tv",
    code: (a, m) => `*555*4*${a}*${m}#`,
  },
  {
    id: "fiberoptic",
    label: "Fiber / Home internet",
    icon: "Wifi",
    // A fibre account is billed to an address, not to a handset, so there is no
    // USSD for it — the honest answer is to pay through eDahab or at an outlet.
    code: (_a, m) => `*100*9*${m}#`,
    offline: true,
  },
];

const AMOUNTS = ["0.25", "0.5", "1", "3", "5", "10", "20"];

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

  const [service, setService] = useState(SERVICES[0].id);
  const [amount, setAmount] = useState("3");
  const [msisdn, setMsisdn] = useState("");
  const [copied, setCopied] = useState(false);

  // The plan the visitor clicked, if they came from a bundle card.
  const plan = params.get("plan");
  const fromService = params.get("service");
  const fromAmount = params.get("amount");

  useEffect(() => {
    if (fromService && SERVICES.some((s) => s.id === fromService)) setService(fromService);
    if (fromAmount) setAmount(fromAmount);
  }, [fromService, fromAmount]);

  const active = SERVICES.find((s) => s.id === service) ?? SERVICES[0];
  const digits = msisdn.replace(/[^\d]/g, "");
  const valid = digits.length >= 7;
  const code = useMemo(() => active.code(amount, digits || "0"), [active, amount, digits]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — the code is on screen to type by hand anyway.
    }
  }

  const label = {
    title: "Recharge your line",
    lead: "Choose what you are topping up, enter your number, then dial the code from your handset. Nothing is charged on this page.",
    what: "What are you topping up?",
    number: "Somtel number",
    amount: "Amount (USD)",
    code: "Your code",
    dial: "Dial the code",
    copy: "Copy",
    copied: "Copied",
    enter: "Enter your number to get the code.",
    selected: "You selected",
    offline: "A fibre account is billed to an address, not a handset. Pay through the eDahab app or at any Somtel outlet.",
    help: `Need a hand? Call us on ${phone}.`,
  };

  return (
    <Section id="recharge" tone="muted">
      <SectionTitle eyebrow={t.eyebrow} title={label.title} description={label.lead} />

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
                {fromAmount && ` · $${fromAmount}`}
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
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
                className="field pl-11"
              />
            </div>

            <p className="field-label mt-6">{label.amount}</p>
            <div role="group" aria-label={label.amount} className="flex flex-wrap gap-2">
              {AMOUNTS.map((value) => {
                const on = value === amount;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value)}
                    aria-pressed={on}
                    className={cx(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color] duration-200",
                      on
                        ? "border-accent-500 bg-accent-500 text-primary-700"
                        : "border-border-strong text-muted hover:border-primary-400 hover:text-fg"
                    )}
                  >
                    ${value}
                  </button>
                );
              })}
            </div>
          </Card>
        </FadeIn>

        {/* Result */}
        <FadeIn delay={0.1}>
          <Card emphasis="feature" interactive={false} className="flex h-full flex-col">
            <div className="flex items-center gap-3">
              <Glyph Icon={iconFor(active.icon)} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {label.code}
                </p>
                <p className="font-semibold text-fg">{active.label}</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {valid ? (
                <motion.div
                  key={`${active.id}-${amount}`}
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0.12 : 0.25 }}
                  className="flex flex-1 flex-col"
                >
                  <p className="mt-5 break-all font-mono text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    {code}
                  </p>

                  {active.offline && <p className="mt-4 text-[0.95rem] text-muted">{label.offline}</p>}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={`tel:${encodeURIComponent(code)}`} external>
                      <Smartphone size={17} />
                      {label.dial}
                    </Button>

                    <button
                      type="button"
                      onClick={copy}
                      className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-[0.95rem] font-semibold text-fg transition-colors duration-200 hover:border-primary-600 hover:bg-primary-600 hover:text-white"
                    >
                      {copied ? <Check size={17} /> : <Copy size={17} />}
                      {copied ? label.copied : label.copy}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex-1 text-muted"
                >
                  {label.enter}
                </motion.p>
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
      </div>
    </Section>
  );
}
