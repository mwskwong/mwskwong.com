import { Entry } from 'contentful';
import { orderBy } from 'lodash-es';
import { unstable_cache as cache } from 'next/cache';

import { contentful } from './client';
import {
  ExperienceSkeleton,
  OrganizationSkeleton,
  SkillSkeleton,
} from './types';

export const getExperiences = cache(async () => {
  // Goal: sort educations in DESC order by `to` date,
  // while having records with `to = undefined` (denote "Present") sorted at the top

  // Contentful always place undefined fields at the bottom,
  // so we first sort in ASC and then reverse it
  // such that it's in DESC order while undefined values are at the top
  const { items } = await contentful.getEntries<ExperienceSkeleton>({
    select: [
      'fields.companies',
      'fields.companiesRelationship',
      'fields.from',
      'fields.jobDuties',
      'fields.jobTitle',
      'fields.skills',
      'fields.supportingDocuments',
      'fields.to',
    ],
    content_type: 'experience',
    order: ['fields.to'],
  });

  items.reverse();
  for (const item of items) {
    item.fields.skills = orderBy(
      item.fields.skills,
      ['fields.proficiency', 'fields.name'],
      ['desc', 'asc'],
    );
  }

  return items.map((item) => ({
    ...item.fields,
    companies: item.fields.companies
      .filter(
        (
          elem,
        ): elem is Entry<OrganizationSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'> =>
          Boolean(elem),
      )
      .map((company) => ({
        ...company.fields,
        logo:
          company.fields.logo?.fields.file &&
          `https:${company.fields.logo.fields.file.url}`,
      })),
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
    skills: item.fields.skills
      .filter(
        (elem): elem is Entry<SkillSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'> =>
          Boolean(elem),
      )
      .map((skill) => skill.fields.name),
  }));
}, ['experiences', 'list']);
