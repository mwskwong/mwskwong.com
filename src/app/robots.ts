import { type MetadataRoute } from "next";

import { routes, siteUrl } from "@/constants/site-config";

const robots = () =>
  ({
    rules: {
      userAgent: "*",
      disallow:
        process.env.VERCEL_ENV === "production" ? routes.params.pathname : "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }) satisfies MetadataRoute.Robots;

export default robots;
