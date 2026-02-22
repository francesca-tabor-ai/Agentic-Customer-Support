import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6">
      <main className="w-full max-w-md space-y-6 text-center">
        <p className="text-sm font-medium text-[var(--muted-foreground)]">
          404
        </p>
        <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)]">
          Page not found
        </h1>
        <p className="text-[var(--muted-foreground)] leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white gradient-accent transition-subtle hover:opacity-90"
          >
            Home
          </Link>
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
