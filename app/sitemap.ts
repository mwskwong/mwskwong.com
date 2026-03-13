import { type MetadataRoute } from "next";
import { cacheLife } from "next/cache";

// eslint-disable-next-line @typescript-eslint/require-await
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  "use cache";
  cacheLife("max");

  return [
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL!}`,
      lastModified: new Date(),
    },
  ];
};

export default sitemap;
