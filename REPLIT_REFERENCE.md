# Replit Reference — Agentic Customer Support

This document is the **canonical reference** for patterns, data model, and API design originally from the Replit reference app. The duplicate Replit codebase has been removed; use this doc when building or extending the main app.

---

## 1. Stack & structure

- **Frontend**: React + Vite + TypeScript, **wouter** for routing, **TanStack Query**, **Tailwind**, shadcn/ui–style components.
- **Backend**: Express, **Drizzle** + PostgreSQL, typed API via **Zod** and shared routes.
- **Shared**: `shared/schema.ts`, `shared/routes.ts`, `shared/models/*` — used by both client and server.

**Key paths:**

- `client/src/` — pages, components, hooks, lib
- `server/` — routes, storage, db, `replit_integrations/` (auth, chat, image, etc.)
- `shared/` — schema, API route definitions, models

---

## 2. Auth

- **Replit Auth**: `/api/login`, `/api/logout`, `/api/auth/user`.
- **Client**: `useAuth()` in `client/src/hooks/use-auth.ts` — `user`, `isLoading`, `logout`; `credentials: "include"` on fetch.
- **Routing**: If `!user` → only Landing; if `user` → Dashboard, Tickets, Agent, Knowledge. Loading state shows a spinner.

---

## 3. App shell & layout

- **Router**: `App.tsx` — auth check, then `<Switch>/<Route>` (wouter). Logged-out catch-all → Landing.
- **Logged-in routes**: `/` Dashboard, `/tickets`, `/agent`, `/knowledge`; 404 for unknown.
- **Layout**: `SidebarLayout` in `layout-sidebar.tsx` — desktop sidebar + mobile Sheet, nav items (Dashboard, Tickets, AI Agent, Knowledge Base), user block and Sign out.

---

## 4. Data model (Drizzle + shared schema)

**Tickets** (`tickets`): `id`, `title`, `description`, `status` (open, in_progress, resolved, escalated), `priority` (low, medium, high, urgent), `customerId`, `assignedTo`, `createdAt`, `updatedAt`, `resolution`, `metadata` (jsonb).

**Documents** (`documents`): `id`, `title`, `content`, `category`, `createdAt`, `updatedAt`.

**Chat**: `conversations` (id, title, createdAt), `messages` (id, conversationId, role, content, createdAt). Stored via `server/replit_integrations/chat/storage.ts`.

Insert types use **drizzle-zod** `createInsertSchema` and omit `id`/timestamps where appropriate.

---

## 5. API (shared routes + server implementation)

**Defined in** `shared/routes.ts`: path + method + optional `input` Zod schema + response schemas. Helper `buildUrl(path, params)` for path params.

**Tickets**: `GET /api/tickets`, `GET /api/tickets/:id`, `POST /api/tickets`, `PATCH /api/tickets/:id`, `POST /api/tickets/:id/resolve` (body: `{ resolution }`).

**Documents**: `GET /api/documents`, `POST /api/documents`.

**Conversations (chat)**: `GET /api/conversations`, `GET /api/conversations/:id`, `POST /api/conversations` (body: `{ title }`), `DELETE /api/conversations/:id`, `POST /api/conversations/:id/messages` (body: `{ content }`) — **streaming SSE** from OpenAI; user message saved, then stream, then assistant message saved.

Server uses `api.*.path` and `api.*.input.parse(req.body)` in `server/routes.ts` and chat in `server/replit_integrations/chat/routes.ts`.

---

## 6. Storage layer

- **Interface** `IStorage` in `server/storage.ts`: tickets (get list, get one, create, update) and documents (list, create).
- **Implementation** `DatabaseStorage`: Drizzle queries; single export `storage`.
- Chat has its own `chatStorage` in `server/replit_integrations/chat/storage.ts`.

---

## 7. Frontend patterns

- **Data**: TanStack Query — `useTickets()`, `useDocuments()`, `useConversations()`, `useConversation(id)`, `useCreateConversation()`, `useSendMessage()`. Mutations invalidate relevant query keys.
- **Agent chat**: List of conversations in sidebar; select conversation → `ChatInterface` with messages, input, send. `useSendMessage` POSTs to `/api/conversations/:id/messages`; backend streams SSE (reference client does not consume stream in hook; it invalidates and refetches with `refetchInterval: 5000`).
- **Dashboard**: Metric cards (total, open, resolved, critical), Recharts bar chart by status, recent tickets list; `StatusBadge` / `PriorityBadge`.
- **Landing**: Split/marketing style — navbar (logo + Login/Get Started → `/api/login`), hero, features grid, dashboard preview section, footer.
- **UI**: shadcn-style components under `client/src/components/ui/`; `cn()`, Card, Button, Input, ScrollArea, Avatar, etc. Brand: “AgentFlow”, `bg-gradient-signature`, purple accent.

---

## 8. Requirements (from Replit `client/requirements.md`)

- **Packages**: framer-motion, recharts, date-fns, lucide-react, clsx, tailwind-merge.
- **Integrations**: Replit Auth (`/api/login`, `/api/logout`, `/api/auth/user`); OpenAI chat (`/api/conversations`).
- **Layout**: Dashboard with sidebar; landing split-screen/marketing for logged-out users.

---

## 9. Seed data

Server runs a short timeout after start: if no tickets, creates two sample tickets; if no documents, creates one “Billing FAQ” document.

---

When adding or changing features in the main app, use this as the reference for auth flow, route definitions, schema shape, storage pattern, and UI structure so behavior stays consistent with the Replit reference.
