import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.base44.com" },
    ],
  },
  async rewrites() {
    return [
      // base44 SDK makes same-origin "/api/..." calls; proxy them to base44.
      {
        source: "/api/:path*",
        destination: "https://app.base44.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
