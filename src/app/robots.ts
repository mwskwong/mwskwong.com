import { type MetadataRoute } from "next";

import { siteUrl } from "@/config";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      disallow: process.env.VERCEL_ENV === "production" ? undefined : "/",
    },
  ],
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
