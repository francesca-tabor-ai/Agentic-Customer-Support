"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FadeInView } from "@/components/ui/FadeInView";
import { useState } from "react";

type NodeType = "retrieval" | "tool" | "decision" | "execution" | "end";

interface Node {
  id: string;
  type: NodeType;
  label: string;
  duration?: number;
  status: "pending" | "active" | "done";
  detail?: string;
}

const mockTrace: Node[] = [
  { id: "1", type: "retrieval", label: "Retrieve context", duration: 120, status: "done", detail: "3 chunks from knowledge base" },
  { id: "2", type: "decision", label: "Intent classification", duration: 45, status: "done", detail: "Billing inquiry" },
  { id: "3", type: "tool", label: "Lookup account", duration: 80, status: "done", detail: "get_account(id)" },
  { id: "4", type: "execution", label: "Generate response", duration: 210, status: "done", detail: "Streaming reply" },
  { id: "5", type: "end", label: "Complete", status: "done" },
];

export default function WorkflowPage() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const nodeStyles: Record<NodeType, string> = {
    retrieval: "border-violet-500 bg-violet-50 text-violet-900",
    tool: "border-blue-500 bg-blue-50 text-blue-900",
    decision: "border-amber-500 bg-amber-50 text-amber-900",
    execution: "border-emerald-500 bg-emerald-50 text-emerald-900",
    end: "border-[var(--muted)] bg-[var(--border)] text-[var(--muted-foreground)]",
  };

  return (
    <div className="space-y-6">
      <FadeInView variant="fade-up">
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Agent workflow
        </h1>
        <p className="mt-1 text-[var(--muted-foreground)] leading-relaxed">
          LangGraph execution flow and step-by-step traces.
        </p>
      </div>
      </FadeInView>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Execution flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                {mockTrace.map((node, i) => (
                  <div key={node.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedNode(node)}
                      className={`rounded-xl border-2 px-4 py-2 text-sm font-medium transition-interactive active-press ${nodeStyles[node.type]} ${
                        selectedNode?.id === node.id
                          ? "ring-2 ring-[var(--foreground)] ring-offset-2"
                          : "hover:opacity-90"
                      }`}
                    >
                      {node.label}
                      {node.duration != null && (
                        <span className="ml-1 tabular-nums opacity-80">
                          {node.duration}ms
                        </span>
                      )}
                    </button>
                    {i < mockTrace.length - 1 && (
                      <span className="text-[var(--muted)]">→</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Step details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNode ? (
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-[var(--muted-foreground)]">Type</dt>
                  <dd className="font-medium capitalize">{selectedNode.type}</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted-foreground)]">Label</dt>
                  <dd className="font-medium">{selectedNode.label}</dd>
                </div>
                {selectedNode.duration != null && (
                  <div>
                    <dt className="text-[var(--muted-foreground)]">Duration</dt>
                    <dd className="tabular-nums">{selectedNode.duration} ms</dd>
                  </div>
                )}
                {selectedNode.detail && (
                  <div>
                    <dt className="text-[var(--muted-foreground)]">Detail</dt>
                    <dd>{selectedNode.detail}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-[var(--muted-foreground)]">Status</dt>
                  <dd className="capitalize">{selectedNode.status}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-[var(--muted-foreground)]">
                Select a node to see details.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trace summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-[var(--muted-foreground)]">Total steps </span>
              <span className="tabular-nums font-medium">{mockTrace.length}</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">Total time </span>
              <span className="tabular-nums font-medium">
                {mockTrace.reduce((s, n) => s + (n.duration ?? 0), 0)} ms
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
