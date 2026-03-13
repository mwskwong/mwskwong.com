import { type MetadataRoute } from "next";
import { cacheLife } from "next/cache";

import { siteFqdn } from "@/config";

// eslint-disable-next-line @typescript-eslint/require-await
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  "use cache";
  cacheLife("max");

  return [
    {
      url: `https://${siteFqdn}`,
      lastModified: new Date(),
    },
  ];
};

export default sitemap;
