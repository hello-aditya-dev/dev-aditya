import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // /services → /capabilities (canonical rename; preserves SEO)
      { source: "/services", destination: "/capabilities", permanent: true },
      // Stale source routes — no project with these slugs exists in projects.ts
      { source: "/work/corporate-leadgen-platform", destination: "/work", permanent: false },
      { source: "/work/driftwear-ecommerce", destination: "/work", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
