import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Article images are hosted on many different publisher domains.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
