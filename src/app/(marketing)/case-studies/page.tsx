import { type Metadata } from "next";
import { FadeInView } from "@/components/ui/FadeInView";
import { LogoMarquee } from "@/components/marketing/LogoMarquee";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Case studies | AI Support",
  description:
    "See how support teams are scaling with AI agents and cutting costs without sacrificing quality.",
};

const caseStudies = [
  {
    company: "TechCorp",
    industry: "SaaS / B2B",
    quote:
      "We cut first-response time by 60% and deflected 40% of tickets to self-service. The workflow builder let us model our entire support flow in a day.",
    metrics: [
      { value: "60%", label: "Faster first response" },
      { value: "40%", label: "Ticket deflection" },
    ],
    author: "Sarah Chen",
    role: "Head of Customer Success",
  },
  {
    company: "DataFlow",
    industry: "Data Platform",
    quote:
      "Our knowledge base was scattered across Confluence, Notion, and Slack. AI Support unified it and our agents now get instant answers. Support costs dropped 35%.",
    metrics: [
      { value: "35%", label: "Cost reduction" },
      { value: "2hr", label: "Saved per agent daily" },
    ],
    author: "Marcus Webb",
    role: "VP Support Operations",
  },
  {
    company: "CloudNine",
    industry: "Enterprise IT",
    quote:
      "We needed SSO, audit logs, and custom SLAs. Enterprise delivered exactly that. Our compliance team approved it in under two weeks.",
    metrics: [
      { value: "10k+", label: "Tickets/month handled" },
      { value: "99.5%", label: "Uptime SLA" },
    ],
    author: "Priya Sharma",
    role: "Director of IT Operations",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col">
      {/* Scrolling logos */}
      <section className="border-b border-[var(--border)] bg-[#fafafa]">
        <p className="pt-12 text-center text-sm font-medium text-[var(--muted-foreground)]">
          Companies using AI Support
        </p>
        <LogoMarquee />
      </section>

      {/* Hero */}
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInView>
            <h1 className="text-4xl font-bold text-[var(--foreground)] sm:text-5xl">
              Real results from real teams
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted-foreground)]">
              See how support teams are scaling with AI agents and cutting costs
              without sacrificing quality.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Case study cards */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl space-y-16">
          {caseStudies.map((study, i) => (
            <FadeInView key={study.company} delay={i * 100}>
              <Card className="overflow-hidden">
                <div className="p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-lg font-semibold text-[var(--foreground)]">
                      {study.company}
                    </span>
                    <span className="rounded-full bg-[var(--border)] px-3 py-0.5 text-xs font-medium text-[var(--muted-foreground)]">
                      {study.industry}
                    </span>
                  </div>
                  <blockquote className="mt-6 text-lg leading-relaxed text-[var(--foreground)]">
                    &ldquo;{study.quote}&rdquo;
                  </blockquote>
                  <div className="mt-8 flex flex-wrap gap-8">
                    {study.metrics.map(({ value, label }) => (
                      <div key={label}>
                        <span className="block text-2xl font-bold text-[var(--foreground)] tabular-nums">
                          {value}
                        </span>
                        <span className="text-sm text-[var(--muted-foreground)]">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 border-t border-[var(--border)] pt-6">
                    <p className="font-semibold text-[var(--foreground)]">
                      {study.author}
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {study.role}
                    </p>
                  </div>
                </div>
              </Card>
            </FadeInView>
          ))}
        </div>
      </section>
    </div>
  );
}
