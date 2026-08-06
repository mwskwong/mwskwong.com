import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";

import { siteUrl } from "@/config";

// oxlint-disable-next-line oxc/no-async-await require-await -- `use cache` requires an async function
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  "use cache: remote";
  cacheLife("max");

  return [
    {
      url: siteUrl.toString(),
      lastModified: new Date(),
    },
  ];
};

export default sitemap;
