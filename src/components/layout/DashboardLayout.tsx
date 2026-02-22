"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Sidebar } from "./Sidebar";

const ChatWidget = dynamic(
  () => import("@/components/chat/ChatWidget").then((m) => ({ default: m.ChatWidget })),
  { ssr: false }
);

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar />
      <main ref={mainRef} className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
      <ChatWidget />
    </div>
  );
}
