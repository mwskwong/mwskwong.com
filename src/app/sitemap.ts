// "use cache"; // TODO: there is currently a bug causing sitemap can;t be cached

import { type MetadataRoute } from 'next';

import { routes, siteUrl } from '@/constants/site-config';

// eslint-disable-next-line @typescript-eslint/require-await -- "use cache" functions must be async functions.
const sitemap = async () => {
  return Object.values(routes).map(({ pathname }) => ({
    url: siteUrl + pathname,
    lastModified: new Date(),
  })) satisfies MetadataRoute.Sitemap;
};

export default sitemap;
