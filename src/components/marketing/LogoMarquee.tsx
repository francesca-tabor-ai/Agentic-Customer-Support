"use client";

const logos = [
  "Acme",
  "TechCorp",
  "DataFlow",
  "CloudNine",
  "Nexus",
  "Stellar",
  "Vertex",
  "Omni",
  "Apex",
  "Nova",
];

export function LogoMarquee() {
  return (
    <div className="relative flex overflow-hidden py-8">
      <div className="flex animate-scroll shrink-0 gap-16 pr-16">
        {[...logos, ...logos].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap text-lg font-semibold text-[var(--muted-foreground)] opacity-70"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
