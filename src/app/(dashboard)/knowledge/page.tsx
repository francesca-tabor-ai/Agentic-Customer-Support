"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { FadeInView } from "@/components/ui/FadeInView";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface Doc {
  id: string;
  name: string;
  chunks: number;
  retrievals: number;
  lastUpdated: string;
}

const initialDocs: Doc[] = [
  { id: "1", name: "Billing FAQ", chunks: 12, retrievals: 342, lastUpdated: "2025-02-20" },
  { id: "2", name: "API Reference v2", chunks: 45, retrievals: 1203, lastUpdated: "2025-02-18" },
  { id: "3", name: "Security & compliance", chunks: 8, retrievals: 89, lastUpdated: "2025-02-15" },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function KnowledgePage() {
  const [docs, setDocs] = useState<Doc[]>(initialDocs);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Doc | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(docs.length + 1);

  function showToast(msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }

  function handleDelete(id: string) {
    setDocs((ds) => ds.filter((d) => d.id !== id));
    if (selected?.id === id) setSelected(null);
    showToast("Document deleted.");
  }

  function handleUpdate(id: string) {
    setDocs((ds) =>
      ds.map((d) => (d.id === id ? { ...d, lastUpdated: today() } : d))
    );
    showToast("Document updated.");
  }

  function handleUpload() {
    nextId.current += 1;
    const newDoc: Doc = {
      id: String(nextId.current),
      name: `New document ${nextId.current}`,
      chunks: 0,
      retrievals: 0,
      lastUpdated: today(),
    };
    setDocs((ds) => [...ds, newDoc]);
    showToast("Document uploaded.");
  }

  const filtered = docs.filter(
    (d) => !search || d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <FadeInView variant="fade-up">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Knowledge base
          </h1>
          <p className="mt-1 text-[var(--muted-foreground)] leading-relaxed">
            Documents, embeddings, and retrieval performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {toast && (
            <span className="text-sm text-emerald-600">{toast}</span>
          )}
          <Button variant="primary" onClick={handleUpload}>Upload document</Button>
        </div>
      </div>
      </FadeInView>

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
            {filtered.length === 0 && (
              <p className="text-sm text-[var(--muted-foreground)]">No documents found.</p>
            )}
            {filtered.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[var(--border)] p-4 transition-colors hover:bg-[var(--border)]/50"
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
                  <Button variant="secondary" onClick={() => handleUpdate(doc.id)}>
                    Update
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-600"
                    onClick={() => handleDelete(doc.id)}
                  >
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
