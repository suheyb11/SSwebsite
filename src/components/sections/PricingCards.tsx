import { Check } from "lucide-react";
import type { PlanView } from "@/types";
import { Badge, Button, cx } from "@/components/ui";
import { Stagger, StaggerItem, HoverLift } from "@/components/motion";

/**
 * Grid of pricing plans. Used on the home page and every product page.
 * The featured plan is marked with a yellow ring and badge rather than a
 * full yellow fill — the accent points at it instead of shouting.
 */
export default function PricingCards({
  plans,
  service,
  ctaHref,
}: {
  plans: PlanView[];
  /**
   * The product these plans belong to. Used to carry the choice into the
   * top-up panel, the same way the bundle picker does.
   */
  service?: string;
  /** Overrides the destination entirely, for a plan that is not self-served. */
  ctaHref?: string;
}) {
  if (plans.length === 0) return null;

  /**
   * "Buy now" goes to the top-up page with the choice already made.
   * It used to default to the contact form, which meant every plan on the home
   * page and on every product page sent people to a form instead of to paying.
   */
  const hrefFor = (plan: PlanView) =>
    ctaHref ??
    "/top-up?" +
      (service ? `service=${encodeURIComponent(service)}&` : "") +
      `plan=${encodeURIComponent(plan.title)}&amount=${plan.price}#recharge`;

  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <StaggerItem key={plan.id}>
          <HoverLift className="h-full">
            <div
              className={cx(
                "relative flex h-full flex-col rounded-2xl border bg-transparent p-8 transition-[box-shadow,border-color,background-color] duration-300",
                plan.highlight
                  ? "border-accent-500 shadow-glow-soft ring-1 ring-accent-500"
                  : "border-border-strong hover:border-primary-400 hover:bg-primary-50/40 hover:shadow-glow-navy-soft"
              )}
            >
              {plan.highlight && (
                <Badge tone="accent" className="absolute -top-3 left-8">
                  Most popular
                </Badge>
              )}

              <h3 className="text-lg font-semibold text-fg">{plan.title}</h3>

              <div className="mt-5 flex items-baseline gap-1 text-fg">
                <span className="text-lg font-medium text-muted">$</span>
                <span className="text-5xl font-semibold tracking-tight">{plan.price}</span>
                {plan.unit && <span className="text-base text-muted">/ {plan.unit}</span>}
              </div>

              <div className="mt-7 h-px bg-border" />

              <ul className="mt-7 flex-1 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={17} className="mt-1 shrink-0 text-accent-500" aria-hidden="true" />
                    <span className="text-[0.95rem] text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href={hrefFor(plan)}
                  variant={plan.highlight ? "accent" : "outline"}
                  className="w-full"
                >
                  Buy now
                </Button>
              </div>
            </div>
          </HoverLift>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
