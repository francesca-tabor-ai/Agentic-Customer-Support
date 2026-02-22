import { z } from "zod";
import { router, publicProcedure } from "../init";
import { analyticsMetrics } from "@/server/db/schema";
import { and, gte, lte } from "drizzle-orm";

export const analyticsRouter = router({
  getMetrics: publicProcedure
    .input(
      z.object({
        from: z.date(),
        to: z.date(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(analyticsMetrics)
        .where(
          and(
            gte(analyticsMetrics.date, input.from),
            lte(analyticsMetrics.date, input.to)
          )
        );
    }),
});
