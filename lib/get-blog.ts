import { orderBy } from "lodash-es";
import { cache } from "react";

import client from "./client";
import { BlogSkeleton } from "./types";

const getBlogBySlug = cache(async (slug: string) => {
  const { items } = await client.getEntries<BlogSkeleton>({
    content_type: "blog",
    "fields.slug[in]": [slug],
    limit: 1,
  });

  return items.map((item) => ({
    updatedAt: new Date(item.sys.updatedAt),
    coverPhoto:
      item.fields.coverPhoto?.fields.file &&
      `https:${item.fields.coverPhoto.fields.file.url}`,
    categories: orderBy(
      item.fields.categories
        ?.map((category) => category?.fields.name)
        .filter((category): category is string => Boolean(category)),
    ),
    title: item.fields.title,
    slug: item.fields.slug,
    content: item.fields.content,
  }));
});

export default getBlogBySlug;
