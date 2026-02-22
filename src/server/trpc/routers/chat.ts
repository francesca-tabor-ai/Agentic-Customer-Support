import { z } from "zod";
import { router, publicProcedure } from "../init";
import { messages } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const chatRouter = router({
  getConversation: publicProcedure
    .input(z.object({ conversationId: z.string() }))
    .query(async ({ ctx, input }) => {
      const msgs = await ctx.db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, input.conversationId));
      return msgs;
    }),

  sendMessage: publicProcedure
    .input(
      z.object({
        conversationId: z.string().min(1),
        role: z.enum(["user", "agent"]),
        content: z.string().min(1, "Content is required").max(10000),
        toolCalls: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const id = `msg-${Date.now()}`;
      const now = new Date();
      await ctx.db.insert(messages).values({
        id,
        conversationId: input.conversationId,
        role: input.role,
        content: input.content,
        toolCalls: input.toolCalls ?? null,
        createdAt: now,
      });
      return { id };
    }),
});
