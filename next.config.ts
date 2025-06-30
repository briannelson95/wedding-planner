import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Do not run ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Do not block production builds on type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
