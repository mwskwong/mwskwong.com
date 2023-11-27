import { cache } from 'react';

import { contentful } from './clients';
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
    grade: item.fields.grade,
    supportingDocuments: item.fields.supportingDocuments?.map(
      (supportingDocument) => ({
        title: supportingDocument?.fields.title,
        url: `https:${supportingDocument?.fields.file?.url}`,
      }),
    ),
  }));
});
