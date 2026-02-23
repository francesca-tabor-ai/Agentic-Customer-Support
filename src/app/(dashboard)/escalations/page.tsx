"use client";

import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FadeInView } from "@/components/ui/FadeInView";
import { Button } from "@/components/ui/Button";
import type { EscalatedTicket, SlaStatus } from "@/types";
import Link from "next/link";
import { useMemo } from "react";

function hoursAgo(h: number) {
  return new Date(Date.now() - h * 3_600_000).toISOString();
}
function hoursFromNow(h: number) {
  return new Date(Date.now() + h * 3_600_000).toISOString();
}

const mockEscalatedTickets: EscalatedTicket[] = [
  {
    id: "T-1004",
    subject: "Enterprise SSO integration failing",
    priority: "high",
    status: "open",
    createdAt: hoursAgo(6),
    escalatedAt: hoursAgo(3),
    slaDueAt: hoursAgo(1),
    slaStatus: "breached",
  },
  {
    id: "T-1001",
    subject: "Billing discrepancy on last invoice",
    priority: "high",
    status: "in_progress",
    agent: "Support Agent Alpha",
    createdAt: hoursAgo(48),
    escalatedAt: hoursAgo(2),
    slaDueAt: hoursFromNow(1),
    slaStatus: "at_risk",
  },
  {
    id: "T-1006",
    subject: "Critical: Payment processing down",
    priority: "high",
    status: "open",
    createdAt: hoursAgo(4),
    escalatedAt: hoursAgo(1),
    slaDueAt: hoursFromNow(0.5),
    slaStatus: "at_risk",
  },
  {
    id: "T-1005",
    subject: "API rate limit increase request",
    priority: "medium",
    status: "in_progress",
    agent: "Support Agent Beta",
    createdAt: hoursAgo(26),
    escalatedAt: hoursAgo(3),
    slaDueAt: hoursFromNow(24),
    slaStatus: "ok",
  },
];

function formatTimeRemaining(dueAt: string): string {
  const now = new Date();
  const due = new Date(dueAt);
  const ms = due.getTime() - now.getTime();
  if (ms <= 0) return "Breached";
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (hours >= 1) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

function slaStatusStyles(status: SlaStatus) {
  switch (status) {
    case "breached":
      return "bg-red-100 text-red-800";
    case "at_risk":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-emerald-100 text-emerald-800";
  }
}

/** Returns 0–100: % of SLA window elapsed (100 = breached) */
function slaProgressPercent(createdAt: string, dueAt: string): number {
  const start = new Date(createdAt).getTime();
  const due = new Date(dueAt).getTime();
  const now = Date.now();
  const total = due - start;
  const elapsed = now - start;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export default function EscalationsPage() {
  const metrics = useMemo(() => {
    const breached = mockEscalatedTickets.filter((t) => t.slaStatus === "breached");
    const atRisk = mockEscalatedTickets.filter((t) => t.slaStatus === "at_risk");
    const escalatedToday = mockEscalatedTickets.filter(
      (t) => new Date(t.escalatedAt).toDateString() === new Date().toDateString()
    );
    return {
      breached: breached.length,
      atRisk: atRisk.length,
      escalatedToday: escalatedToday.length,
      total: mockEscalatedTickets.length,
    };
  }, []);

  const sortedTickets = useMemo(
    () =>
      [...mockEscalatedTickets].sort((a, b) => {
        const order: Record<SlaStatus, number> = { breached: 0, at_risk: 1, ok: 2 };
        return order[a.slaStatus] - order[b.slaStatus];
      }),
    []
  );

  return (
    <div className="space-y-8">
      <FadeInView variant="fade-up">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            SLA & Escalations
          </h1>
          <p className="mt-1 text-[var(--muted-foreground)] leading-relaxed">
            Monitor escalated tickets and service level agreements at a glance.
          </p>
        </div>
      </FadeInView>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Breached SLA",
            value: metrics.breached,
            trend: metrics.breached > 0 ? ("down" as const) : undefined,
            subtitle: metrics.breached > 0 ? "Requires immediate action" : "All clear",
          },
          {
            title: "At risk",
            value: metrics.atRisk,
            trend: metrics.atRisk > 0 ? ("down" as const) : undefined,
            subtitle: metrics.atRisk > 0 ? "Within 1 hour of breach" : "None",
          },
          {
            title: "Escalated today",
            value: metrics.escalatedToday,
            subtitle: "In queue",
          },
          {
            title: "Total escalated",
            value: metrics.total,
            subtitle: "Active in queue",
          },
        ].map((m, i) => (
          <FadeInView key={m.title} delay={i * 50} variant="fade-up">
            <MetricCard
              title={m.title}
              value={m.value}
              subtitle={m.subtitle}
              trend={"trend" in m ? m.trend : undefined}
            />
          </FadeInView>
        ))}
      </div>

      <FadeInView delay={100} variant="fade-up">
        <Card>
          <CardHeader>
            <CardTitle>Escalation queue</CardTitle>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Tickets ordered by urgency. Breached first, then at risk, then on track.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="pb-3 font-medium text-[var(--muted-foreground)]">ID</th>
                    <th className="pb-3 font-medium text-[var(--muted-foreground)]">Subject</th>
                    <th className="pb-3 font-medium text-[var(--muted-foreground)]">Priority</th>
                    <th className="pb-3 font-medium text-[var(--muted-foreground)]">SLA</th>
                    <th className="pb-3 font-medium text-[var(--muted-foreground)]">Time left</th>
                    <th className="pb-3 font-medium text-[var(--muted-foreground)]">Assigned</th>
                    <th className="pb-3 font-medium text-[var(--muted-foreground)]">Escalated</th>
                    <th className="pb-3 font-medium text-[var(--muted-foreground)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTickets.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-[var(--border)] last:border-0 transition-colors hover:bg-[var(--border)]/50"
                    >
                      <td className="py-3 font-medium tabular-nums">{t.id}</td>
                      <td className="py-3">{t.subject}</td>
                      <td className="py-3 capitalize text-[var(--muted-foreground)]">
                        {t.priority}
                      </td>
                      <td className="py-3">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium ${slaStatusStyles(t.slaStatus)}`}
                          >
                            {t.slaStatus.replace("_", " ")}
                          </span>
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--border)]">
                            <div
                              className={`h-full rounded-full transition-all ${
                                t.slaStatus === "breached"
                                  ? "bg-red-500"
                                  : t.slaStatus === "at_risk"
                                    ? "bg-amber-500"
                                    : "gradient-accent"
                              }`}
                              style={{
                                width: `${slaProgressPercent(t.createdAt, t.slaDueAt)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 tabular-nums">
                        <span
                          className={
                            t.slaStatus === "breached"
                              ? "font-medium text-red-600"
                              : t.slaStatus === "at_risk"
                                ? "font-medium text-amber-600"
                                : "text-[var(--muted-foreground)]"
                          }
                        >
                          {formatTimeRemaining(t.slaDueAt)}
                        </span>
                      </td>
                      <td className="py-3 text-[var(--muted-foreground)]">
                        {t.agent ?? "—"}
                      </td>
                      <td className="py-3 text-[var(--muted-foreground)]">
                        {new Date(t.escalatedAt).toLocaleString()}
                      </td>
                      <td className="py-3">
                        <Link href={`/tickets?ticket=${t.id}`}>
                          <Button variant="ghost" className="text-sm">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </FadeInView>
    </div>
  );
}
