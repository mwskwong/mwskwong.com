import { siteUrl } from "@/constants/site-config";
import { type MetadataRoute } from "next";

const robots = () =>
  ({
    rules: {
      userAgent: "*",
      disallow: process.env.VERCEL_ENV === "production" ? undefined : "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }) satisfies MetadataRoute.Robots;

export default robots;
