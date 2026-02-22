"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms (for sequential children) */
  delay?: number;
  /** Animation variant */
  variant?: "fade" | "fade-up" | "fade-down";
}

export function FadeInView({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -24px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base = "transition-all duration-500 ease-out";
  const variants = {
    fade: isVisible ? "opacity-100" : "opacity-0",
    "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
    "fade-down": isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
  };

  return (
    <div
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
