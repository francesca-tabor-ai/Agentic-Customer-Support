"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FadeInView } from "@/components/ui/FadeInView";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <FadeInView variant="fade-up">
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Settings
        </h1>
        <p className="mt-1 text-[var(--muted-foreground)] leading-relaxed">
          Agent parameters, LLM, tools, and credentials.
        </p>
      </div>
      </FadeInView>

      <Card>
        <CardHeader>
          <CardTitle>Agent parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)]">
              Max turns per conversation
            </label>
            <input
              type="number"
              defaultValue={10}
              className="mt-1 w-24 rounded-lg border border-[var(--border)] px-3 py-2 text-sm tabular-nums"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)]">
              Temperature
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="2"
              defaultValue={0.7}
              className="mt-1 w-24 rounded-lg border border-[var(--border)] px-3 py-2 text-sm tabular-nums"
            />
          </div>
          <Button variant="primary">Save</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>LLM model</CardTitle>
        </CardHeader>
        <CardContent>
          <select className="w-full max-w-xs rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm">
            <optgroup label="OpenAI">
              <option>GPT-4o</option>
              <option>GPT-4o mini</option>
            </optgroup>
            <optgroup label="Anthropic">
              <option>Claude 3.5 Sonnet</option>
              <option>Claude 3 Haiku</option>
            </optgroup>
            <optgroup label="Gemini">
              <option>Gemini 1.5 Pro</option>
              <option>Gemini 1.5 Flash</option>
            </optgroup>
          </select>
          <Button variant="primary" className="mt-4">
            Save
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tool integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-center justify-between rounded-lg border border-[var(--border)] px-4 py-3">
              <span className="font-medium">Knowledge base retrieval</span>
              <span className="text-sm text-emerald-600">Enabled</span>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-[var(--border)] px-4 py-3">
              <span className="font-medium">Account lookup</span>
              <span className="text-sm text-emerald-600">Enabled</span>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-[var(--border)] px-4 py-3">
              <span className="font-medium">Ticket creation</span>
              <span className="text-sm text-[var(--muted-foreground)]">Disabled</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API keys & credentials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[var(--muted-foreground)]">
            Store API keys securely. Values are encrypted at rest.
          </p>
          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)]">
              OpenAI API key
            </label>
            <input
              type="password"
              placeholder="sk-…"
              className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>
          <Button variant="primary">Update credentials</Button>
        </CardContent>
      </Card>
    </div>
  );
}
