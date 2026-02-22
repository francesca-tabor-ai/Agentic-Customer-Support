import {
  sqliteTable,
  text,
  integer,
  real,
} from "drizzle-orm/sqlite-core";

export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey(),
  subject: text("subject").notNull(),
  status: text("status", { enum: ["open", "in_progress", "resolved"] })
    .notNull()
    .default("open"),
  priority: text("priority", { enum: ["low", "medium", "high"] })
    .notNull()
    .default("medium"),
  agentId: text("agent_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const agents = sqliteTable("agents", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status", { enum: ["active", "idle"] }).notNull().default("idle"),
  activeConversations: integer("active_conversations").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const conversations = sqliteTable("conversations", {
  id: text("id").primaryKey(),
  ticketId: text("ticket_id").references(() => tickets.id),
  agentId: text("agent_id").references(() => agents.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => conversations.id),
  role: text("role", { enum: ["user", "agent"] }).notNull(),
  content: text("content").notNull(),
  toolCalls: text("tool_calls"), // JSON
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const knowledgeDocuments = sqliteTable("knowledge_documents", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  chunkCount: integer("chunk_count").notNull().default(0),
  retrievalCount: integer("retrieval_count").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const analyticsMetrics = sqliteTable("analytics_metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: integer("date", { mode: "timestamp" }).notNull(),
  automationRate: real("automation_rate").notNull(),
  ticketVolume: integer("ticket_volume").notNull(),
  costUsd: real("cost_usd").notNull(),
});

export const userPreferences = sqliteTable("user_preferences", {
  id: text("id").primaryKey(),
  theme: text("theme", { enum: ["light", "dark", "system"] }).default("system"),
  defaultDateRange: text("default_date_range").default("30d"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
