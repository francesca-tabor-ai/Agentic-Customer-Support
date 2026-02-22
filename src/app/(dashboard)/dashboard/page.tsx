"use client";

import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { Agent, DashboardMetrics } from "@/types";
import { useEffect, useState } from "react";

const mockMetrics: DashboardMetrics = {
  activeAgents: 12,
  ticketVolume: 2847,
  automationRate: 67,
  avgResponseTime: "1.2m",
  systemHealth: "Operational",
};

const mockAgents: Agent[] = [
  { id: "1", name: "Support Agent Alpha", status: "active", conversations: 8 },
  { id: "2", name: "Support Agent Beta", status: "active", conversations: 5 },
  { id: "3", name: "Support Agent Gamma", status: "idle", conversations: 0 },
];

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>(mockMetrics);
  const [agents] = useState<Agent[]>(mockAgents);

  useEffect(() => {
    const t = setInterval(() => {
      setMetrics((m) => ({
        ...m,
        ticketVolume: m.ticketVolume + Math.floor(Math.random() * 3),
        automationRate: Math.min(100, Math.max(0, m.automationRate + (Math.random() > 0.5 ? 1 : -1))),
      }));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Dashboard
        </h1>
        <p className="mt-1 text-[var(--muted-foreground)] leading-relaxed">
          Real-time overview of agents, tickets, and system health.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Active agents" value={metrics.activeAgents} />
        <MetricCard
          title="Ticket volume"
          value={metrics.ticketVolume.toLocaleString()}
          subtitle="This month"
        />
        <MetricCard
          title="Automation rate"
          value={`${metrics.automationRate}%`}
          trend="up"
          subtitle="+2% vs last week"
        />
        <MetricCard
          title="Avg response time"
          value={metrics.avgResponseTime}
          subtitle="Target: &lt;2m"
        />
        <MetricCard
          title="System health"
          value={metrics.systemHealth}
          subtitle="All systems nominal"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Agent status</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {agents.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)] px-4 py-3"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {a.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        a.status === "active" ? "bg-emerald-500" : "bg-[var(--muted)]"
                      }`}
                    />
                    <span className="text-sm text-[var(--muted-foreground)]">
                      {a.status === "active"
                        ? `${a.conversations} active`
                        : "Idle"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">In queue</span>
                <span className="tabular-nums font-medium">23</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-[var(--border)]">
                <div
                  className="h-full rounded-full gradient-accent transition-all"
                  style={{ width: "65%" }}
                />
              </div>
              <div className="flex justify-between text-sm text-[var(--muted-foreground)]">
                <span>Capacity</span>
                <span>65% utilized</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
