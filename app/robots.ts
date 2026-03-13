import { type MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      disallow: process.env.VERCEL_ENV === "production" ? undefined : "/",
    },
  ],
  sitemap: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}/sitemap.xml`,
});

export default robots;
