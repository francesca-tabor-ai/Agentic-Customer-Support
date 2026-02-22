"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tickets", label: "Tickets" },
  { href: "/workflow", label: "Workflow" },
  { href: "/analytics", label: "Analytics" },
  { href: "/knowledge", label: "Knowledge base" },
  { href: "/settings", label: "Settings" },
  { href: "/chat", label: "Chat demo" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 flex-col border-r border-[var(--border)] bg-white">
      <div className="flex h-16 items-center border-b border-[var(--border)] px-6">
        <span className="text-lg font-semibold text-[var(--foreground)]">
          AI Support
        </span>
      </div>
      <nav className="flex-1 space-y-0.5 p-4">
        {navItems.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-interactive active-press ${
                isActive
                  ? "bg-[var(--foreground)] text-white"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--border)] hover:text-[var(--foreground)]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
