import Link from "next/link";
import { FadeInView } from "@/components/ui/FadeInView";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/40" />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeInView>
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
              For support teams that scale
            </p>
            <h1 className="text-4xl font-bold leading-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              Stop drowning in tickets. Let AI agents handle it.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
              Enterprise AI Support Platform gives your team intelligent agents
              that learn from your knowledge base, decide the right action, and
              resolve issues in real time—so you can focus on what matters.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white gradient-accent transition-subtle hover:opacity-90"
              >
                Open dashboard
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-subtle hover:bg-[var(--border)]"
              >
                View pricing
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Customer + Pain + Solution */}
      <section className="border-t border-[var(--border)] bg-[#fafafa] px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-16 lg:grid-cols-3">
            <FadeInView delay={0}>
              <div className="rounded-xl border border-[var(--border)] bg-white p-8 shadow-soft">
                <div className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
                  Who it&apos;s for
                </div>
                <p className="leading-relaxed text-[var(--muted-foreground)]">
                  Support leads and ops teams at growing SaaS companies, enterprise
                  IT, and customer success orgs. You handle hundreds or thousands
                  of tickets a month and need to scale without drowning in cost or
                  headcount.
                </p>
              </div>
            </FadeInView>
            <FadeInView delay={100}>
              <div className="rounded-xl border border-[var(--border)] bg-white p-8 shadow-soft">
                <div className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
                  The pain
                </div>
                <p className="leading-relaxed text-[var(--muted-foreground)]">
                  Repetitive questions, slow response times, knowledge scattered
                  across docs and tribal memory. Hiring more agents is expensive
                  and doesn&apos;t fix the root problem. You need answers that are
                  fast, accurate, and consistent at scale.
                </p>
              </div>
            </FadeInView>
            <FadeInView delay={200}>
              <div className="rounded-xl border border-[var(--border)] bg-white p-8 shadow-soft">
                <div className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
                  How we fix it
                </div>
                <p className="leading-relaxed text-[var(--muted-foreground)]">
                  Multi-agent AI that learns your knowledge base, routes tickets
                  intelligently, suggests resolutions, and automates common flows.
                  Your team gets a unified dashboard, workflow visibility, and
                  real-time analytics—while customers get faster, better support.
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-t border-[var(--border)] px-6 py-12">
        <p className="mb-8 text-center text-sm font-medium text-[var(--muted-foreground)]">
          Trusted by support teams at leading companies
        </p>
        <div className="mx-auto max-w-4xl">
          <Link
            href="/case-studies"
            className="flex flex-wrap items-center justify-center gap-12 opacity-60 hover:opacity-80 transition-subtle"
          >
            {["Acme", "TechCorp", "DataFlow", "CloudNine", "Nexus"].map(
              (name) => (
                <span
                  key={name}
                  className="text-lg font-semibold text-[var(--muted-foreground)]"
                >
                  {name}
                </span>
              )
            )}
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--foreground)] px-6 py-20 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to scale support?
          </h2>
          <p className="mt-4 text-[#a1a1aa]">
            Start with Individual or jump straight to Team or Enterprise.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center justify-center rounded-xl border border-white/30 bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-subtle hover:bg-white/90"
          >
            View pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
