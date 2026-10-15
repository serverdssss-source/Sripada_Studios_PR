import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets verification builds use a separate folder (NEXT_DIST_DIR=.next-check)
  // so they never clobber a running `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
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
