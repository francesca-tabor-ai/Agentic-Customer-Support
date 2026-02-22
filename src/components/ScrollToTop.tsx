"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Scrolls window to top on route change. Used for non-dashboard pages (e.g. home). */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
