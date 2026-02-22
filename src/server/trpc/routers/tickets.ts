import { z } from "zod";
import { router, publicProcedure } from "../init";
import { tickets } from "@/server/db/schema";
import { eq, desc, and } from "drizzle-orm";

const conditions = (input: {
  status?: "open" | "in_progress" | "resolved";
  priority?: "low" | "medium" | "high";
}) => {
  const conds = [];
  if (input.status) conds.push(eq(tickets.status, input.status));
  if (input.priority) conds.push(eq(tickets.priority, input.priority));
  return conds.length ? and(...conds) : undefined;
};

export const ticketsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        status: z.enum(["open", "in_progress", "resolved"]).optional(),
        priority: z.enum(["low", "medium", "high"]).optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where = conditions(input);
      const rows = await ctx.db
        .select()
        .from(tickets)
        .where(where)
        .orderBy(desc(tickets.createdAt));
      if (input.search) {
        const term = input.search.toLowerCase();
        return rows.filter(
          (r) =>
            r.subject.toLowerCase().includes(term) || r.id.toLowerCase().includes(term)
        );
      }
      return rows;
    }),

  byId: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const [row] = await ctx.db.select().from(tickets).where(eq(tickets.id, input.id));
    return row ?? null;
  }),

  create: publicProcedure
    .input(
      z.object({
        subject: z.string(),
        priority: z.enum(["low", "medium", "high"]).default("medium"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const id = `T-${Date.now()}`;
      const now = new Date();
      await ctx.db.insert(tickets).values({
        id,
        subject: input.subject,
        priority: input.priority,
        status: "open",
        createdAt: now,
        updatedAt: now,
      });
      return { id };
    }),

  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["open", "in_progress", "resolved"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tickets)
        .set({ status: input.status, updatedAt: new Date() })
        .where(eq(tickets.id, input.id));
      return { ok: true };
    }),

  assign: publicProcedure
    .input(z.object({ id: z.string(), agentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tickets)
        .set({ agentId: input.agentId, status: "in_progress", updatedAt: new Date() })
        .where(eq(tickets.id, input.id));
      return { ok: true };
    }),
});
