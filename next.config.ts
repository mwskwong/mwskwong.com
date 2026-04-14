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
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ],
  experimental: {
    turbopackFileSystemCacheForBuild: true,
    typedEnv: true,
  },
};

export default nextConfig;
