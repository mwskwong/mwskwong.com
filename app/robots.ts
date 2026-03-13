import { type MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      disallow: process.env.VERCEL_ENV === "production" ? undefined : "/",
    },
  ],
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  sitemap: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL!}/sitemap.xml`,
});

export default robots;
