import { type MetadataRoute } from "next";

import { siteUrl } from "@/constants/site-config";

const robots = () =>
  ({
    rules: {
      userAgent: "*",
      disallow: process.env.VERCEL_ENV === "production" ? "/params" : "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }) satisfies MetadataRoute.Robots;

export default robots;
