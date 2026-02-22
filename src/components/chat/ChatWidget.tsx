"use client";

import { useState, useRef, useEffect } from "react";
import {
  getPlatformGuideReply,
  PROMPT_PROBES,
  type PromptProbe,
} from "@/lib/platformGuide";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I’m your platform guide. I can answer questions about the Dashboard, Tickets, Workflow, Analytics, Knowledge base, and Settings. What would you like to know?",
};

function renderContentWithBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      data-role={message.role}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-[var(--foreground)] text-white"
            : "border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {isUser ? message.content : renderContentWithBold(message.content)}
        </p>
      </div>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate brief delay then reply from platform guide
    setTimeout(() => {
      const reply = getPlatformGuideReply(trimmed);
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: reply,
      };
      setMessages((m) => [...m, assistantMsg]);
      setLoading(false);
    }, 400 + Math.random() * 300);
  };

  const handleProbe = (probe: PromptProbe) => {
    sendMessage(probe);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Toggle button - bottom right */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--foreground)] text-white shadow-lg transition-interactive active-press hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--muted)] focus:ring-offset-2"
        aria-label={open ? "Close chat" : "Open platform guide"}
      >
        {open ? (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-40 flex w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-lg animate-panel-in"
          style={{ maxHeight: "min(560px, 70vh)" }}
          role="dialog"
          aria-label="Platform guide"
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <h2 className="text-base font-semibold text-[var(--foreground)]">
              Platform guide
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--border)] hover:text-[var(--foreground)]"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--muted-foreground)]">
                    …
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Prompt probes */}
            <div className="border-t border-[var(--border)] px-4 py-3">
              <p className="mb-2 text-xs font-medium text-[var(--muted-foreground)]">
                Suggested questions
              </p>
              <div className="flex flex-wrap gap-2">
                {PROMPT_PROBES.map((probe) => (
                  <button
                    key={probe}
                    type="button"
                    onClick={() => handleProbe(probe)}
                    disabled={loading}
                    className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition-subtle hover:bg-[var(--border)] disabled:opacity-50"
                  >
                    {probe}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex gap-2 border-t border-[var(--border)] p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the platform…"
                disabled={loading}
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--muted)]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-xl bg-[var(--foreground)] px-4 py-2.5 text-sm font-medium text-white transition-subtle hover:opacity-90 disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
