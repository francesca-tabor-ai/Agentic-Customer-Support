/**
 * Domain types for the Enterprise AI Support Platform.
 * Use these across dashboard, tickets, workflows, analytics, and API layers.
 */

export type AgentStatus = "active" | "idle";

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  conversations: number;
}

export interface DashboardMetrics {
  activeAgents: number;
  ticketVolume: number;
  automationRate: number;
  avgResponseTime: string;
  systemHealth: string;
}

/** SLA (Service Level Agreement) targets in hours by priority */
export const SLA_HOURS: Record<string, number> = {
  high: 4,
  medium: 24,
  low: 72,
};

export type SlaStatus = "ok" | "at_risk" | "breached";

export interface EscalatedTicket {
  id: string;
  subject: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress";
  agent?: string;
  createdAt: string;
  escalatedAt: string;
  slaDueAt: string;
  slaStatus: SlaStatus;
}
