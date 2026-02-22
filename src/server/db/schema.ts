import {
  pgTable,
  text,
  integer,
  real,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

export const tickets = pgTable("tickets", {
  id: text("id").primaryKey(),
  subject: text("subject").notNull(),
  status: text("status")
    .$type<"open" | "in_progress" | "resolved">()
    .notNull()
    .default("open"),
  priority: text("priority")
    .$type<"low" | "medium" | "high">()
    .notNull()
    .default("medium"),
  agentId: text("agent_id"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const agents = pgTable("agents", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status")
    .$type<"active" | "idle">()
    .notNull()
    .default("idle"),
  activeConversations: integer("active_conversations").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull(),
});

export const conversations = pgTable("conversations", {
  id: text("id").primaryKey(),
  ticketId: text("ticket_id").references(() => tickets.id),
  agentId: text("agent_id").references(() => agents.id),
  createdAt: timestamp("created_at").notNull(),
});

export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => conversations.id),
  role: text("role").$type<"user" | "agent">().notNull(),
  content: text("content").notNull(),
  toolCalls: text("tool_calls"), // JSON
  createdAt: timestamp("created_at").notNull(),
});

export const knowledgeDocuments = pgTable("knowledge_documents", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  chunkCount: integer("chunk_count").notNull().default(0),
  retrievalCount: integer("retrieval_count").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull(),
});

export const analyticsMetrics = pgTable("analytics_metrics", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  automationRate: real("automation_rate").notNull(),
  ticketVolume: integer("ticket_volume").notNull(),
  costUsd: real("cost_usd").notNull(),
});

export const userPreferences = pgTable("user_preferences", {
  id: text("id").primaryKey(),
  theme: text("theme")
    .$type<"light" | "dark" | "system">()
    .default("system"),
  defaultDateRange: text("default_date_range").default("30d"),
  updatedAt: timestamp("updated_at").notNull(),
});
