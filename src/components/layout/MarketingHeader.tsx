"use client";

import Link from "next/link";

const navItems = [
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case studies" },
];

export function MarketingHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-subtle"
        >
          AI Support
        </Link>
        <nav className="flex items-center gap-8">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-subtle"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white gradient-accent transition-subtle hover:opacity-90"
          >
            Open dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
