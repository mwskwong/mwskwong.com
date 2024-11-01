import dedent from "dedent";
import type { NextConfig } from "next";
import NextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Content-Security-Policy",
          value: dedent`
            default-src 'self';
            script-src 'self' 'unsafe-eval' 'unsafe-inline' va.vercel-scripts.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' images.ctfassets.net blob: data:;
            font-src 'self';
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            upgrade-insecure-requests;
          `.replace(/\n/g, ""),
        },
      ],
    },
  ],
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  experimental: {
    reactCompiler: true,
    ppr: true,
    dynamicIO: true,
    useLightningcss: true,
    typedRoutes: true,
  },
};

export default withBundleAnalyzer(nextConfig);
