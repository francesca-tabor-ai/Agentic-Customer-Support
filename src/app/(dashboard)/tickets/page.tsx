"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { FadeInView } from "@/components/ui/FadeInView";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

type Status = "open" | "in_progress" | "resolved";
type Priority = "low" | "medium" | "high";

interface Ticket {
  id: string;
  subject: string;
  status: Status;
  priority: Priority;
  agent?: string;
  createdAt: string;
  messages: { role: "user" | "agent"; text: string; at: string }[];
}

const AGENTS = ["Support Agent Alpha", "Support Agent Beta", "Support Agent Gamma"];

const initialTickets: Ticket[] = [
  {
    id: "T-1001",
    subject: "Billing discrepancy on last invoice",
    status: "in_progress",
    priority: "high",
    agent: "Support Agent Alpha",
    createdAt: "2025-02-20T10:00:00Z",
    messages: [
      { role: "user", text: "My invoice shows a charge I don't recognize.", at: "2025-02-20T10:00:00Z" },
      { role: "agent", text: "I've looked up your account. The line item is for the Premium add-on. Would you like me to remove it for next cycle?", at: "2025-02-20T10:02:00Z" },
      { role: "user", text: "Yes please, and can I get a credit for this month?", at: "2025-02-20T10:05:00Z" },
    ],
  },
  {
    id: "T-1002",
    subject: "API rate limit increase request",
    status: "open",
    priority: "medium",
    createdAt: "2025-02-21T14:30:00Z",
    messages: [
      { role: "user", text: "We need to increase our API rate limit for the production key.", at: "2025-02-21T14:30:00Z" },
    ],
  },
  {
    id: "T-1003",
    subject: "Password reset not receiving email",
    status: "resolved",
    priority: "high",
    agent: "Support Agent Beta",
    createdAt: "2025-02-19T09:15:00Z",
    messages: [
      { role: "user", text: "I never get the password reset email.", at: "2025-02-19T09:15:00Z" },
      { role: "agent", text: "We've verified your email and sent a new link. Please check spam.", at: "2025-02-19T09:20:00Z" },
      { role: "user", text: "Got it, thanks!", at: "2025-02-19T09:22:00Z" },
    ],
  },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Ticket | null>(null);

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
      const matchSearch =
        !search ||
        t.subject.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchPriority && matchSearch;
    });
  }, [tickets, statusFilter, priorityFilter, search]);

  function updateTicket(id: string, patch: Partial<Ticket>) {
    setTickets((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    setSelected((s) => (s?.id === id ? { ...s, ...patch } : s));
  }

  function handleResolve(id: string) {
    updateTicket(id, { status: "resolved" });
  }

  function handleAssign(id: string, currentAgent?: string) {
    const next = AGENTS[(AGENTS.indexOf(currentAgent ?? "") + 1) % AGENTS.length];
    updateTicket(id, { agent: next, status: "in_progress" });
  }

  function handleEscalate(id: string) {
    updateTicket(id, { priority: "high", status: "in_progress" });
  }

  return (
    <div className="space-y-6">
      <FadeInView variant="fade-up">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Tickets</h1>
        <p className="mt-1 text-[var(--muted-foreground)] leading-relaxed">
          Filter, search, and manage support tickets.
        </p>
        </div>
      </FadeInView>

      <FadeInView delay={50} variant="fade-up">
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="search"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={
                "rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--muted)]"
              }
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            >
              <option value="all">All statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as Priority | "all")}
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            >
              <option value="all">All priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="pb-3 font-medium text-[var(--muted-foreground)]">ID</th>
                  <th className="pb-3 font-medium text-[var(--muted-foreground)]">Subject</th>
                  <th className="pb-3 font-medium text-[var(--muted-foreground)]">Status</th>
                  <th className="pb-3 font-medium text-[var(--muted-foreground)]">Priority</th>
                  <th className="pb-3 font-medium text-[var(--muted-foreground)]">Assigned</th>
                  <th className="pb-3 font-medium text-[var(--muted-foreground)]">Created</th>
                  <th className="pb-3 font-medium text-[var(--muted-foreground)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-[var(--border)] last:border-0 transition-colors hover:bg-[var(--border)]/50"
                  >
                    <td className="py-3 font-medium tabular-nums">{t.id}</td>
                    <td className="py-3">{t.subject}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          t.status === "resolved"
                            ? "bg-emerald-100 text-emerald-800"
                            : t.status === "in_progress"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-[var(--border)] text-[var(--muted-foreground)]"
                        }`}
                      >
                        {t.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 capitalize text-[var(--muted-foreground)]">
                      {t.priority}
                    </td>
                    <td className="py-3 text-[var(--muted-foreground)]">
                      {t.agent ?? "—"}
                    </td>
                    <td className="py-3 text-[var(--muted-foreground)]">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <Button
                        variant="ghost"
                        className="text-sm"
                        onClick={() => setSelected(t)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </FadeInView>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.id} — ${selected.subject}` : undefined}
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  selected.status === "resolved"
                    ? "bg-emerald-100 text-emerald-800"
                    : selected.status === "in_progress"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-[var(--border)] text-[var(--muted-foreground)]"
                }`}
              >
                {selected.status.replace("_", " ")}
              </span>
              <span className="rounded-full bg-[var(--border)] px-2 py-0.5 text-xs capitalize">
                {selected.priority}
              </span>
              {selected.agent && (
                <span className="text-sm text-[var(--muted-foreground)]">
                  Assigned: {selected.agent}
                </span>
              )}
            </div>
            <div>
              <h4 className="mb-2 font-medium text-[var(--foreground)]">
                Conversation
              </h4>
              <ul className="max-h-64 space-y-3 overflow-y-auto rounded-lg border border-[var(--border)] p-4">
                {selected.messages.map((m, i) => (
                  <li
                    key={i}
                    className={`rounded-lg p-2 ${
                      m.role === "user"
                        ? "ml-4 bg-[var(--border)]"
                        : "mr-4 bg-[var(--foreground)] text-white"
                    }`}
                  >
                    <span className={`text-xs ${m.role === "agent" ? "text-white/60" : "text-[var(--muted-foreground)]"}`}>
                      {m.role} · {new Date(m.at).toLocaleString()}
                    </span>
                    <p className="mt-1 text-sm">{m.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-[var(--border)] pt-4">
              <Button
                variant="primary"
                onClick={() => handleAssign(selected.id, selected.agent)}
                disabled={selected.status === "resolved"}
              >
                Assign
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleResolve(selected.id)}
                disabled={selected.status === "resolved"}
              >
                {selected.status === "resolved" ? "Resolved" : "Resolve"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleEscalate(selected.id)}
                disabled={selected.status === "resolved" || selected.priority === "high"}
              >
                Escalate
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
