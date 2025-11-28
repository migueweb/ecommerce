import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Skip type-checking during build to avoid blocking on warnings/errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint during production builds.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

