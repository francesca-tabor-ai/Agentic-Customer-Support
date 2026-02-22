import { describe, it, expect, beforeAll } from "vitest";
import path from "path";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "@/server/db";
import { appRouter } from "@/server/trpc/root";
import { createContext } from "@/server/trpc/init";

describe("tRPC procedures", () => {
  beforeAll(() => {
    migrate(db, {
      migrationsFolder: path.resolve(process.cwd(), "drizzle"),
    });
  });

  it("tickets.create creates a ticket and list returns it", async () => {
    const ctx = await createContext();
    const caller = appRouter.createCaller(ctx);
    const { id } = await caller.tickets.create({
      subject: "Test ticket",
      priority: "high",
    });
    expect(id).toBeDefined();
    expect(String(id).startsWith("T-")).toBe(true);

    const list = await caller.tickets.list({});
    expect(list.length).toBeGreaterThanOrEqual(1);
    const created = list.find((t) => t.id === id);
    expect(created).toBeDefined();
    expect(created?.subject).toBe("Test ticket");
    expect(created?.priority).toBe("high");
    expect(created?.status).toBe("open");
  });

  it("tickets.list filters by status and search", async () => {
    const ctx = await createContext();
    const caller = appRouter.createCaller(ctx);
    const { id } = await caller.tickets.create({
      subject: "Unique billing question",
      priority: "medium",
    });
    await caller.tickets.updateStatus({ id, status: "resolved" });

    const resolved = await caller.tickets.list({ status: "resolved" });
    expect(resolved.every((t) => t.status === "resolved")).toBe(true);

    const searchResult = await caller.tickets.list({
      search: "Unique billing",
    });
    expect(searchResult.some((t) => t.subject.includes("Unique billing"))).toBe(
      true
    );
  });

  it("tickets.byId returns null for missing id", async () => {
    const ctx = await createContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.tickets.byId({ id: "nonexistent" });
    expect(result).toBeNull();
  });
});
