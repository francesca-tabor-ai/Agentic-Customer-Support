import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const nextConfig: NextConfig = {
  // Use project root for Turbopack when multiple lockfiles exist
  turbopack: { root: process.cwd() },
  // Production: strict transport and basic security
  poweredByHeader: false,
};

export default function getNextConfig(phase: string) {
  if (phase === PHASE_PRODUCTION_BUILD) {
    process.env.NEXT_PHASE = PHASE_PRODUCTION_BUILD;
  }
  return nextConfig;
}
