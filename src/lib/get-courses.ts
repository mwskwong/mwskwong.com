import { orderBy } from 'lodash-es';
import { cache } from 'react';

import { client } from './client';
import { CourseSkeleton } from './types';

export const getCourses = cache(async () => {
  const { items } = await client.getEntries<CourseSkeleton>({
    select: ['fields'],
    content_type: 'course',
    order: ['fields.name'],
  });

  return items.map((item) => ({
    ...item.fields,
    institution: item.fields.institution && {
      id: item.fields.institution.sys.id,
      name: item.fields.institution.fields.name,
    },
    certificate:
      item.fields.certificate?.fields.file &&
      `https:${item.fields.certificate.fields.file.url}`,
    categories: orderBy(
      item.fields.categories
        ?.map((category) => category?.fields.name)
        .filter((category): category is string => Boolean(category)),
    ),
  }));
});
