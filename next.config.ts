import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets verification builds use a separate folder (NEXT_DIST_DIR=.next-check)
  // so they never clobber a running `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Lets phones and other machines on the office network open `npm run dev` via the
  // "Network" URL (e.g. http://192.168.0.187:3000); otherwise its scripts are blocked.
  allowedDevOrigins: ["192.168.*.*"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
