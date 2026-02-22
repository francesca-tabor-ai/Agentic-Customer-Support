/**
 * LLM provider order: OpenAI is used before Gemini (and Anthropic).
 * Use this order when selecting or falling back between providers.
 */
export const LLM_PROVIDER_ORDER = [
  "openai",
  "anthropic",
  "gemini",
] as const;

export type LLMProvider = (typeof LLM_PROVIDER_ORDER)[number];
