"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

const mockDocs = [
  { id: "1", name: "Billing FAQ", chunks: 12, retrievals: 342, lastUpdated: "2025-02-20" },
  { id: "2", name: "API Reference v2", chunks: 45, retrievals: 1203, lastUpdated: "2025-02-18" },
  { id: "3", name: "Security & compliance", chunks: 8, retrievals: 89, lastUpdated: "2025-02-15" },
];

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof mockDocs)[0] | null>(null);

  const filtered = mockDocs.filter(
    (d) =>
      !search || d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Knowledge base
          </h1>
          <p className="mt-1 text-[var(--muted-foreground)] leading-relaxed">
            Documents, embeddings, and retrieval performance.
          </p>
        </div>
        <Button variant="primary">Upload document</Button>
      </div>

      <Card>
        <CardHeader>
          <input
            type="search"
            placeholder="Search documents…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--muted)]"
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[var(--border)] p-4"
              >
                <div>
                  <p className="font-medium text-[var(--foreground)]">{doc.name}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {doc.chunks} chunks · {doc.retrievals} retrievals · Updated{" "}
                    {doc.lastUpdated}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setSelected(doc)}>
                    View
                  </Button>
                  <Button variant="secondary">Update</Button>
                  <Button variant="ghost" className="text-red-600">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
      >
        {selected && (
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-[var(--muted-foreground)]">Chunks (embeddings)</dt>
              <dd className="tabular-nums font-medium">{selected.chunks}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Retrieval count</dt>
              <dd className="tabular-nums font-medium">{selected.retrievals}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Last updated</dt>
              <dd>{selected.lastUpdated}</dd>
            </div>
          </dl>
        )}
      </Modal>
    </div>
  );
}
