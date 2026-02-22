import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6">
      <main className="w-full max-w-2xl space-y-8 text-center">
        <h1 className="text-4xl font-bold leading-tight text-[var(--foreground)]">
          Enterprise AI Support Platform
        </h1>
        <p className="text-lg leading-relaxed text-[var(--muted-foreground)]">
          Scale support with AI agents that learn, decide, and resolve—in real time.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white gradient-accent transition-subtle hover:opacity-90"
          >
            Open dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
