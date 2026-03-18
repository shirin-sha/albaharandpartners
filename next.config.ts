import type { NextConfig } from "next";

const isWindows = process.platform === "win32";
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  // Workaround for Windows EPERM lock on `.next/trace`:
  // Use a separate dist dir locally on Windows only.
  // Keep Vercel/default builds using `.next` (required by Vercel build outputs).
  ...(isWindows && !isVercel ? { distDir: ".next-build" } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
