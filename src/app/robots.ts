import { type MetadataRoute } from "next";

import { siteFqdn } from "@/config";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      disallow: process.env.VERCEL_ENV === "production" ? undefined : "/",
    },
  ],
  sitemap: `https://${siteFqdn}/sitemap.xml`,
});

export default robots;
