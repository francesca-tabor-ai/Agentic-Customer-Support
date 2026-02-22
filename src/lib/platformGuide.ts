/**
 * Platform guide: answers and suggested prompts for the conversational AI widget.
 * Used to answer questions about the platform and guide users.
 */

export const PROMPT_PROBES = [
  "What can I do on the Dashboard?",
  "How do I manage tickets?",
  "Explain the Workflow view",
  "Where do I find analytics?",
  "How does the Knowledge base work?",
  "Where are settings?",
] as const;

export type PromptProbe = (typeof PROMPT_PROBES)[number];

const platformAnswers: Record<string, string> = {
  dashboard:
    "The **Dashboard** gives you a quick overview of your support operations: active agents, ticket volume, automation rate, average response time, and system health. Use it to spot trends and see how your team is performing at a glance.",
  tickets:
    "Go to **Tickets** in the sidebar to see and manage all support tickets. You can view status, assign agents, and track the full lifecycle of each conversation. Open a ticket to see details and reply.",
  workflow:
    "The **Workflow** view shows how conversations move through your system—from intake to resolution. You can see which agents handle which steps and how automation fits in. It’s useful for understanding and improving your processes.",
  analytics:
    "**Analytics** is in the sidebar. There you’ll find reports and metrics on volume, resolution times, agent performance, and more. Use it to measure effectiveness and find areas to improve.",
  knowledge:
    "The **Knowledge base** is where you store articles, FAQs, and runbooks that agents (and automation) can use to answer consistently. Keep it updated so the AI and your team have accurate, up-to-date information.",
  settings:
    "**Settings** in the sidebar lets you configure the platform: agents, integrations, notifications, and other options. Only admins can change sensitive settings.",
};

const keywords: [RegExp | string, string][] = [
  [/dashboard|overview|home|main/i, "dashboard"],
  [/ticket|tickets|manage.*request|support.*request/i, "tickets"],
  [/workflow|process|pipeline|steps/i, "workflow"],
  [/analytics|metrics|reports|data|insight/i, "analytics"],
  [/knowledge|kb|articles|faq|documentation|runbook/i, "knowledge"],
  [/settings|config|preferences|admin/i, "settings"],
  [/help|get started|start|guide|how.*use/i, "welcome"],
];

/** Get a conversational reply for a user message about the platform. */
export function getPlatformGuideReply(userMessage: string): string {
  const lower = userMessage.trim().toLowerCase();
  if (!lower) {
    return "Ask me anything about the platform—Dashboard, Tickets, Workflow, Analytics, Knowledge base, or Settings. You can also click one of the suggested questions below.";
  }

  for (const [pattern, key] of keywords) {
    const matches =
      typeof pattern === "string" ? lower.includes(pattern) : pattern.test(userMessage);
    if (matches) {
      if (key === "welcome") {
        return "You can use the sidebar to move between **Dashboard**, **Tickets**, **Workflow**, **Analytics**, **Knowledge base**, and **Settings**. Tell me which area you’re interested in, or click one of the suggestions below.";
      }
      const answer = platformAnswers[key];
      if (answer) return answer;
    }
  }

  return "I can help you with the Dashboard, Tickets, Workflow, Analytics, Knowledge base, and Settings. Try asking something like “What can I do on the Dashboard?” or “How do I manage tickets?”—or pick one of the suggested questions below.";
}

