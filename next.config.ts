import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  typedRoutes: true,
  images: { formats: ["image/avif", "image/webp"] },
  headers: () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ],
  experimental: {
    turbopackRustReactCompiler: true,
    typedEnv: true,
  },
};

export default nextConfig;
