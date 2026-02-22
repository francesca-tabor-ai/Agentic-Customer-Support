import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use project root for Turbopack when multiple lockfiles exist
  turbopack: { root: process.cwd() },
  // Production: strict transport and basic security
  poweredByHeader: false,
};

export default nextConfig;
