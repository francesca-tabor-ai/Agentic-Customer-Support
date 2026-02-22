import type { Metadata } from "next";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Enterprise AI Support Platform",
  description: "Scale support with AI agents that learn, decide, and resolve—in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* DM Sans via link for reliable production build (no next/font pipeline) */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap"
        />
      </head>
      <body className="antialiased font-sans">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
