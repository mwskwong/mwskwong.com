import { type MetadataRoute } from "next";

import { routes, siteUrl } from "@/constants/site-config";
import { getBlogPosts } from "@/lib/queries";

const sitemap = async () => {
  const blogPosts = await getBlogPosts();

  return [
    ...Object.values(routes).map(({ pathname }) => ({
      url: siteUrl + pathname,
      lastModified: new Date(),
    })),
    ...blogPosts.map(({ slug, updatedAt }) => ({
      url: `${siteUrl}${routes.blog.pathname}/${slug}`,
      lastModified: updatedAt,
    })),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
