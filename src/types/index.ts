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
