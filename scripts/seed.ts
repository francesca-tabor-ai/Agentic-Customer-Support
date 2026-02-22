import { config } from "dotenv";

config();
config({ path: ".env.local", override: true });

import { db } from "../src/server/db";
import {
  agents,
  tickets,
  conversations,
  messages,
  knowledgeDocuments,
  analyticsMetrics,
  userPreferences,
} from "../src/server/db/schema";
import { sql } from "drizzle-orm";

const now = new Date();

async function seed() {
  // Clear in reverse FK order (or use CASCADE)
  await db.execute(sql`TRUNCATE messages, conversations, tickets, agents, knowledge_documents, analytics_metrics, user_preferences RESTART IDENTITY CASCADE`);

  // 1. Agents (no FK)
  await db.insert(agents).values([
    {
      id: "A-1",
      name: "Support Agent Alpha",
      status: "active",
      activeConversations: 8,
      updatedAt: now,
    },
    {
      id: "A-2",
      name: "Support Agent Beta",
      status: "active",
      activeConversations: 5,
      updatedAt: now,
    },
    {
      id: "A-3",
      name: "Support Agent Gamma",
      status: "idle",
      activeConversations: 0,
      updatedAt: now,
    },
  ]);

  // 2. Tickets (agentId optional)
  await db.insert(tickets).values([
    {
      id: "T-1001",
      subject: "Billing question about last invoice",
      status: "in_progress",
      priority: "high",
      agentId: "A-1",
      createdAt: new Date("2025-02-20T10:00:00Z"),
      updatedAt: now,
    },
    {
      id: "T-1002",
      subject: "API rate limit exceeded",
      status: "open",
      priority: "medium",
      agentId: null,
      createdAt: new Date("2025-02-21T14:30:00Z"),
      updatedAt: now,
    },
    {
      id: "T-1003",
      subject: "Account verification not working",
      status: "resolved",
      priority: "medium",
      agentId: "A-2",
      createdAt: new Date("2025-02-19T09:15:00Z"),
      updatedAt: now,
    },
  ]);

  // 3. Conversations (FK: tickets, agents)
  await db.insert(conversations).values([
    { id: "C-1", ticketId: "T-1001", agentId: "A-1", createdAt: now },
    { id: "C-2", ticketId: "T-1003", agentId: "A-2", createdAt: now },
  ]);

  // 4. Messages (FK: conversations)
  await db.insert(messages).values([
    {
      id: "M-1",
      conversationId: "C-1",
      role: "user",
      content: "I need help with my last invoice.",
      toolCalls: null,
      createdAt: now,
    },
    {
      id: "M-2",
      conversationId: "C-1",
      role: "agent",
      content: "I'll look up your invoice details. Can you confirm your account email?",
      toolCalls: null,
      createdAt: now,
    },
  ]);

  // 5. Knowledge documents
  await db.insert(knowledgeDocuments).values([
    {
      id: "K-1",
      name: "Billing FAQ",
      chunkCount: 12,
      retrievalCount: 342,
      updatedAt: new Date("2025-02-20"),
    },
    {
      id: "K-2",
      name: "API Reference v2",
      chunkCount: 45,
      retrievalCount: 1203,
      updatedAt: new Date("2025-02-18"),
    },
    {
      id: "K-3",
      name: "Security & compliance",
      chunkCount: 8,
      retrievalCount: 89,
      updatedAt: new Date("2025-02-15"),
    },
  ]);

  // 6. Analytics metrics
  const baseDate = new Date("2025-02-01");
  await db.insert(analyticsMetrics).values([
    { date: baseDate, automationRate: 0.72, ticketVolume: 450, costUsd: 124.5 },
    {
      date: new Date("2025-02-08"),
      automationRate: 0.78,
      ticketVolume: 520,
      costUsd: 118.2,
    },
    {
      date: new Date("2025-02-15"),
      automationRate: 0.81,
      ticketVolume: 580,
      costUsd: 112.0,
    },
  ]);

  // 7. User preferences
  await db.insert(userPreferences).values([
    {
      id: "user-default",
      theme: "system",
      defaultDateRange: "30d",
      updatedAt: now,
    },
  ]);

  console.log("✅ Seeded all tables: agents, tickets, conversations, messages, knowledgeDocuments, analyticsMetrics, userPreferences");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
