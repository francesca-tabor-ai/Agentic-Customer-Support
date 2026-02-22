"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to monitoring in production
    if (process.env.NODE_ENV === "production") {
      console.error("Application error:", error.message, error.digest);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6">
      <main className="w-full max-w-md space-y-6 text-center">
        <p className="text-sm font-medium text-[var(--muted-foreground)]">
          Something went wrong
        </p>
        <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)]">
          An error occurred
        </h1>
        <p className="text-[var(--muted-foreground)] leading-relaxed">
          We’ve been notified and are looking into it. You can try again or
          return to the dashboard.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white gradient-accent transition-subtle hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-subtle hover:bg-[var(--border)]"
          >
            Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
