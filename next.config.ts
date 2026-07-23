import type { NextConfig } from "next";

// 301-redirects from the old hayweb site (damhousing.nl) so existing Google
// rankings and inbound links survive the switch to this Next.js site. Menu
// pages map 1:1; all old listing URLs (/woningaanbod/*) fold into /aanbod.
const OLD_SITE_REDIRECTS = [
  { source: "/woningaanbod", destination: "/aanbod" },
  { source: "/woningaanbod/:slug*", destination: "/aanbod" },
  { source: "/24-8f10/:slug*", destination: "/verkoop" },
  { source: "/22-d747/:slug*", destination: "/aankoop" },
  { source: "/23-770a/:slug*", destination: "/verhuur" },
  { source: "/5-7be/:slug*", destination: "/taxatie" },
  { source: "/25-4836/:slug*", destination: "/over-dam-housing" },
  { source: "/8-bffa/:slug*", destination: "/contact" },
  { source: "/27-3eae/:slug*", destination: "/verkoop" },
  { source: "/4-9936/:slug*", destination: "/aanbod" },
  { source: "/12-4d2c/:slug*", destination: "/aanbod" },
  { source: "/20-6209/:slug*", destination: "/aanbod" },
  { source: "/38-9c4/:slug*", destination: "/contact" },
  { source: "/11-4085/:slug*", destination: "/" },
  { source: "/34-2077/:slug*", destination: "/" },
  { source: "/35-6903/:slug*", destination: "/" },
  { source: "/36-1bbe/:slug*", destination: "/" },
];

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "media.base44.com" },
      { protocol: "https", hostname: "images.realworks.nl" },
      { protocol: "https", hostname: "hayweb.blob.core.windows.net" },
    ],
  },
  async redirects() {
    return OLD_SITE_REDIRECTS.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        // Hashed local logos & static assets — cache hard.
        source: "/:file(.*\\.(?:png|jpg|jpeg|svg|webp|avif|ico|woff2))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
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
