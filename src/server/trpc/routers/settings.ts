import { z } from "zod";
import { router, publicProcedure } from "../init";
import { userPreferences } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const settingsRouter = router({
  getPreferences: publicProcedure
    .input(z.object({ userId: z.string() }).optional())
    .query(async ({ ctx, input }) => {
      if (!input?.userId) return null;
      const [row] = await ctx.db
        .select()
        .from(userPreferences)
        .where(eq(userPreferences.id, input.userId));
      return row ?? null;
    }),

  setPreferences: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        theme: z.enum(["light", "dark", "system"]).optional(),
        defaultDateRange: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const now = new Date();
      await ctx.db
        .insert(userPreferences)
        .values({
          id: input.userId,
          theme: input.theme ?? "system",
          defaultDateRange: input.defaultDateRange ?? "30d",
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: userPreferences.id,
          set: {
            ...(input.theme != null && { theme: input.theme }),
            ...(input.defaultDateRange != null && { defaultDateRange: input.defaultDateRange }),
            updatedAt: now,
          },
        });
      return { ok: true };
    }),
});
