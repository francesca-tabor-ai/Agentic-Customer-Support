"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FadeInView } from "@/components/ui/FadeInView";

const dateRanges = ["7d", "30d", "90d"] as const;

const mockAutomationData = [62, 65, 64, 67, 68, 70, 67];
const mockTicketData = [120, 145, 132, 158, 142, 165, 150];
const mockCostData = [420, 480, 450, 520, 490, 510, 480];

export default function AnalyticsPage() {
  const [range, setRange] = useState<(typeof dateRanges)[number]>("30d");

  return (
    <div className="space-y-6">
      <FadeInView variant="fade-up">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Analytics
          </h1>
          <p className="mt-1 text-[var(--muted-foreground)] leading-relaxed">
            Automation metrics, agent performance, and cost analysis.
          </p>
        </div>
        <div className="flex gap-2">
          {dateRanges.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-interactive active-press ${
                range === r
                  ? "bg-[var(--foreground)] text-white"
                  : "border border-[var(--border)] hover:bg-[var(--border)]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      </FadeInView>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Automation rate over time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-32 items-end gap-1">
              {mockAutomationData.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t gradient-accent min-h-[20%] transition-all"
                  style={{ height: `${(v / 100) * 100}%` }}
                  title={`${v}%`}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              Last 7 data points
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Ticket volume trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-32 items-end gap-1">
              {mockTicketData.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-[var(--border)] min-h-[10%] transition-all"
                  style={{ height: `${(v / 200) * 100}%` }}
                  title={String(v)}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              Tickets per period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Cost analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-32 items-end gap-1">
              {mockCostData.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-[var(--foreground)] min-h-[10%] opacity-80 transition-all"
                  style={{ height: `${(v / 600) * 100}%` }}
                  title={`$${v}`}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              Est. cost ($)
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent performance comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="pb-3 font-medium text-[var(--muted-foreground)]">Agent</th>
                  <th className="pb-3 font-medium text-[var(--muted-foreground)]">Tickets resolved</th>
                  <th className="pb-3 font-medium text-[var(--muted-foreground)]">Avg resolution time</th>
                  <th className="pb-3 font-medium text-[var(--muted-foreground)]">Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--border)] transition-colors hover:bg-[var(--border)]/50">
                  <td className="py-3 font-medium">Support Agent Alpha</td>
                  <td className="py-3 tabular-nums">312</td>
                  <td className="py-3 tabular-nums">8.2m</td>
                  <td className="py-3 tabular-nums">4.6/5</td>
                </tr>
                <tr className="border-b border-[var(--border)] transition-colors hover:bg-[var(--border)]/50">
                  <td className="py-3 font-medium">Support Agent Beta</td>
                  <td className="py-3 tabular-nums">287</td>
                  <td className="py-3 tabular-nums">7.1m</td>
                  <td className="py-3 tabular-nums">4.8/5</td>
                </tr>
                <tr className="transition-colors hover:bg-[var(--border)]/50">
                  <td className="py-3 font-medium">Support Agent Gamma</td>
                  <td className="py-3 tabular-nums">198</td>
                  <td className="py-3 tabular-nums">9.0m</td>
                  <td className="py-3 tabular-nums">4.4/5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
