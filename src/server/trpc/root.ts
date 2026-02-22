import { router } from "./init";
import { ticketsRouter } from "./routers/tickets";
import { agentsRouter } from "./routers/agents";
import { analyticsRouter } from "./routers/analytics";
import { knowledgeRouter } from "./routers/knowledge";
import { chatRouter } from "./routers/chat";
import { settingsRouter } from "./routers/settings";

export const appRouter = router({
  tickets: ticketsRouter,
  agents: agentsRouter,
  analytics: analyticsRouter,
  knowledge: knowledgeRouter,
  chat: chatRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
