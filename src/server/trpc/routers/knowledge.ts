import { z } from "zod";
import { router, publicProcedure } from "../init";
import { knowledgeDocuments } from "@/server/db/schema";
import { eq, like } from "drizzle-orm";

export const knowledgeRouter = router({
  list: publicProcedure
    .input(z.object({ search: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.select().from(knowledgeDocuments);
      if (input?.search) {
        const term = input.search.toLowerCase();
        return rows.filter((r) => r.name.toLowerCase().includes(term));
      }
      return rows;
    }),

  byId: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const [row] = await ctx.db
      .select()
      .from(knowledgeDocuments)
      .where(eq(knowledgeDocuments.id, input.id));
    return row ?? null;
  }),

  create: publicProcedure
    .input(z.object({ name: z.string(), chunkCount: z.number().default(0) }))
    .mutation(async ({ ctx, input }) => {
      const id = `doc-${Date.now()}`;
      const now = new Date();
      await ctx.db.insert(knowledgeDocuments).values({
        id,
        name: input.name,
        chunkCount: input.chunkCount,
        updatedAt: now,
      });
      return { id };
    }),

  delete: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(knowledgeDocuments).where(eq(knowledgeDocuments.id, input.id));
    return { ok: true };
  }),
});
