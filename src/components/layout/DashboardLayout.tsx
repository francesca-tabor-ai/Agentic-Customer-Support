import { Sidebar } from "./Sidebar";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
      <ChatWidget />
    </div>
  );
}
