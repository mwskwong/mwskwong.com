import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  typedRoutes: true,
  images: { formats: ["image/avif", "image/webp"] },
  headers: () => [
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
          value: "DENY",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
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
          // ref: https://nextjs.org/docs/app/guides/content-security-policy#without-nonces
          // ref: https://vercel.com/docs/vercel-toolbar/managing-toolbar#using-a-content-security-policy
          value: `
            default-src 'self';
            script-src 'self' https://va.vercel-scripts.com https://vercel.live 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""};
            connect-src 'self' https://vercel.live wss://ws-us3.pusher.com;
            img-src 'self' https://vercel.live https://vercel.com blob: data:;
            frame-src 'self' https://vercel.live;
            style-src 'self' https://vercel.live 'unsafe-inline';            
            font-src 'self' https://vercel.live https://assets.vercel.com;
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            upgrade-insecure-requests;
          `
            .replaceAll(/\s+/g, " ")
            .trim(),
        },
      ],
    },
  ],
  logging: { fetches: { fullUrl: true } },
  experimental: {
    turbopackFileSystemCacheForBuild: true,
    typedEnv: true,
    optimizePackageImports: ["@mantine/core"],
  },
};

export default nextConfig;
