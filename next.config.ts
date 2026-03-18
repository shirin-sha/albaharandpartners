import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workaround for Windows EPERM lock on `.next/trace`:
  // use a fresh dist directory for builds/dev.
  distDir: ".next-build",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
