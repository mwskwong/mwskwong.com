import { cache } from 'react';

import { contentful } from './client';
import { EducationSkeleton } from './types';

export const getEducations = cache(async () => {
  // Goal: sort educations in DESC order by `to` date,
  // while having records with `to = undefined` (denote "Present") sorted at the top

  // Contentful always place undefined fields at the bottom,
  // so we first sort in ASC and then reverse it
  // such that it's in DESC order while undefined values are at the top
  const { items } = await contentful.getEntries<EducationSkeleton>({
    select: ['fields'],
    content_type: 'education',
    order: ['fields.to'],
  });

  items.reverse();

  return items.map((item) => ({
    ...item.fields,
    school: item.fields.school && {
      ...item.fields.school.fields,
      logo:
        item.fields.school.fields.logo?.fields.file &&
        `https:${item.fields.school.fields.logo.fields.file.url}`,
    },
    supportingDocuments: item.fields.supportingDocuments
      ?.map(
        (supportingDocument) =>
          supportingDocument?.fields.title &&
          supportingDocument.fields.file && {
            title: supportingDocument.fields.title,
            url: `https:${supportingDocument.fields.file.url}`,
          },
      )
      .filter((elem): elem is { title: string; url: string } => Boolean(elem)),
  }));
});
