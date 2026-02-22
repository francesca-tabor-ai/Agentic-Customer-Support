"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  toolCalls?: { name: string; result: string }[];
}

const streamedResponse =
  "I've looked up your account. The extra charge on your last invoice is for the **Premium add-on** you enabled on the 15th. I can remove it for the next billing cycle and apply a one-time credit for this month. Should I go ahead?";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "agent",
      content: "Hello. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim() || streaming) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setStreaming(true);

    // Simulate tool call then streamed reply
    const agentId = (Date.now() + 1).toString();
    setMessages((m) => [
      ...m,
      {
        id: agentId,
        role: "agent",
        content: "",
        toolCalls: [
          { name: "get_account", result: "Account #8821, Premium add-on active" },
        ],
      },
    ]);

    let i = 0;
    const t = setInterval(() => {
      if (i >= streamedResponse.length) {
        clearInterval(t);
        setStreaming(false);
        return;
      }
      setMessages((m) =>
        m.map((msg) =>
          msg.id === agentId
            ? { ...msg, content: streamedResponse.slice(0, i + 1) }
            : msg
        )
      );
      i++;
    }, 20);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Chat demo
        </h1>
        <p className="mt-1 text-[var(--muted-foreground)] leading-relaxed">
          Try the agent with tool calls and streaming responses.
        </p>
      </div>

      <Card className="flex max-h-[calc(100vh-16rem)] flex-col">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-xl border p-4 ${
                  msg.role === "user"
                    ? "ml-8 border-[var(--border)] bg-[var(--border)]"
                    : "mr-8 border-[var(--foreground)] bg-[var(--foreground)] text-white"
                }`}
              >
                <span className="text-xs opacity-80">{msg.role}</span>
                {msg.toolCalls && (
                  <div className="mt-2 rounded-lg bg-black/20 p-2 text-xs">
                    {msg.toolCalls.map((tc, i) => (
                      <div key={i}>
                        <span className="font-medium">{tc.name}</span>
                        <span className="opacity-80"> → {tc.result}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="prose prose-invert mt-2 max-w-none text-sm prose-p:my-1">
                  {msg.content || (streaming && "…")}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--muted)]"
              disabled={streaming}
            />
            <Button type="submit" variant="primary" disabled={streaming}>
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
