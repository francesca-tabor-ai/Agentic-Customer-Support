import Link from "next/link";
import { type Metadata } from "next";
import { FadeInView } from "@/components/ui/FadeInView";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Pricing | AI Support",
  description:
    "Simple, scalable pricing: Individual, Team, and Enterprise plans. Start with a 14-day free trial.",
};

const tiers = [
  {
    name: "Individual",
    description: "For solo support pros and small teams getting started.",
    price: 29,
    period: "month",
    features: [
      "Up to 500 tickets/month",
      "1 AI agent",
      "Knowledge base (100 articles)",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start free trial",
    href: "/dashboard",
    featured: false,
  },
  {
    name: "Team",
    description: "For growing support teams that need to scale without the chaos.",
    price: 99,
    period: "month",
    features: [
      "Up to 5,000 tickets/month",
      "5 AI agents",
      "Knowledge base (1,000 articles)",
      "Workflow builder",
      "Advanced analytics",
      "Priority support",
      "API access",
    ],
    cta: "Start free trial",
    href: "/dashboard",
    featured: true,
  },
  {
    name: "Enterprise",
    description: "For large orgs with custom needs and strict compliance.",
    price: null,
    period: "custom",
    features: [
      "Unlimited tickets",
      "Unlimited AI agents",
      "Unlimited knowledge base",
      "Custom workflows & integrations",
      "SSO & audit logs",
      "Dedicated success manager",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    href: "#",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInView>
            <h1 className="text-4xl font-bold text-[var(--foreground)] sm:text-5xl">
              Simple, scalable pricing
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted-foreground)]">
              Start with Individual, scale to Team, or go Enterprise. Every plan
              includes a 14-day free trial.
            </p>
          </FadeInView>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <FadeInView key={tier.name} delay={i * 80}>
              <Card
                className={`relative flex flex-col ${
                  tier.featured
                    ? "border-2 border-[var(--accent-mid)] shadow-lg ring-2 ring-[var(--accent-mid)]/20"
                    : ""
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)] px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                    {tier.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    {tier.price !== null ? (
                      <>
                        <span className="text-3xl font-bold text-[var(--foreground)]">
                          ${tier.price}
                        </span>
                        <span className="text-[var(--muted-foreground)]">
                          /{tier.period}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-[var(--foreground)]">
                        Custom
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="mb-8 space-y-3 text-sm text-[var(--muted-foreground)]">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="text-emerald-600">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier.href}
                    className={`mt-auto inline-flex justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-subtle ${
                      tier.featured
                        ? "gradient-accent text-white hover:opacity-90"
                        : "border border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-[var(--border)]"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </CardContent>
              </Card>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* Scale info */}
      <section className="border-t border-[var(--border)] bg-[#fafafa] px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Scales with you
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted-foreground)]">
            Need more tickets or agents? Add usage-based add-ons at any tier, or
            upgrade when you outgrow your plan. Enterprise includes volume
            discounts and custom SLAs.
          </p>
        </div>
      </section>
    </div>
  );
}
