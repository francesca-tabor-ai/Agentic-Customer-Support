import { router, publicProcedure } from "../init";
import { agents } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const agentsRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(agents);
  }),

  getStatus: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.select().from(agents);
    const active = rows.filter((r) => r.status === "active").length;
    const totalConversations = rows.reduce((s, r) => s + r.activeConversations, 0);
    return {
      agents: rows,
      activeCount: active,
      totalConversations,
    };
  }),
});
