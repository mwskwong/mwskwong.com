import { orderBy } from "lodash-es";
import { cache } from "react";

import client from "./client";
import { BlogSkeleton } from "./types";

const getBlogs = cache(
  async (pagination?: { page: number; pageSize?: number }) => {
    const { page = 1, pageSize = 9 } = pagination ?? {};
    const { items } = await client.getEntries<BlogSkeleton>({
      select: [
        "sys.updatedAt",
        "fields.categories",
        "fields.coverPhoto",
        "fields.description",
        "fields.slug",
        "fields.title",
      ],
      content_type: "blog",
      order: ["-sys.updatedAt"],
      skip: pagination && (page - 1) * pageSize,
      limit: pagination && pageSize,
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
      description: item.fields.description,
    }));
  },
);

export default getBlogs;
