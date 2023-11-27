'use server';

import { Entry } from 'contentful';
import { orderBy } from 'lodash-es';
import { unstable_cache as cache } from 'next/cache';

import { contentful, prisma } from './clients';
import {
  BlogSkeleton,
  CourseSkeleton,
  EducationSkeleton,
  ExperienceSkeleton,
  OrganizationSkeleton,
  PlatformProfileSkeleton,
  ProjectSkeleton,
  SkillCategorySkeleton,
  SkillSkeleton,
} from './types';

export const getBlogBySlug = cache(async (slug: string) => {
  const { items } = await contentful.getEntries<BlogSkeleton>({
    select: ['sys.id', 'sys.createdAt', 'sys.updatedAt', 'fields'],
    content_type: 'blog',
    'fields.slug[in]': [slug],
    limit: 1,
  });

  const item = items[0];
  return (
    item && {
      id: item.sys.id,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
      coverPhoto:
        item.fields.coverPhoto?.fields.file &&
        `https:${item.fields.coverPhoto.fields.file.url}`,
      categories: item.fields.categories
        ?.map((category) => category?.fields.name)
        .filter((category): category is string => Boolean(category))
        .sort(),
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
      content: item.fields.content,
    }
  );
});

export const getBlogs = cache(
  async (pagination?: { page: number; pageSize?: number }) => {
    const { page = 1, pageSize = 9 } = pagination ?? {};
    const { items } = await contentful.getEntries<BlogSkeleton>({
      select: [
        'sys.updatedAt',
        'sys.id',
        'fields.categories',
        'fields.coverPhoto',
        'fields.description',
        'fields.slug',
        'fields.title',
      ],
      content_type: 'blog',
      order: ['-sys.updatedAt'],
      skip: pagination && (page - 1) * pageSize,
      limit: pagination && pageSize,
    });

    return items.map((item) => ({
      id: item.sys.id,
      updatedAt: item.sys.updatedAt,
      coverPhoto:
        item.fields.coverPhoto?.fields.file &&
        `https:${item.fields.coverPhoto.fields.file.url}`,
      categories: item.fields.categories
        ?.map((category) => category?.fields.name)
        .filter((category): category is string => Boolean(category))
        .sort(),
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
    }));
  },
);

export const getContributedProjects = cache(async () => {
  const { items } = await contentful.getEntries<ProjectSkeleton>({
    select: ['sys.id', 'fields.name', 'fields.url'],
    content_type: 'project',
    'metadata.tags.sys.id[in]': ['contributed'],
    order: ['fields.name'],
  });

  return items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    url: item.fields.url,
  }));
});

export const getCourses = cache(async () => {
  const { items } = await contentful.getEntries<CourseSkeleton>({
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
    categories: item.fields.categories
      ?.map((category) => category?.fields.name)
      .filter((category): category is string => Boolean(category))
      .sort(),
  }));
});

export const getCv = cache(async () => {
  const asset = await contentful.getAsset('6mTh13ou7wM2Cs7ZC1tcdn');
  return asset.fields.file && `https:${asset.fields.file.url}`;
});

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
      'fields.projects',
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
    projects: item.fields.projects?.map((project) => ({
      ...project?.fields,
      thumbnail: `https:${project?.fields.thumbnail?.fields.file?.url}`,
    })),
    supportingDocuments: item.fields.supportingDocuments?.map(
      (supportingDocument) => ({
        title: supportingDocument?.fields.title,
        url: `https:${supportingDocument?.fields.file?.url}`,
      }),
    ),
    skills: item.fields.skills
      .filter(
        (elem): elem is Entry<SkillSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'> =>
          Boolean(elem),
      )
      .map((skill) => skill.fields.name),
  }));
});

export const getPersonalPhoto = cache(async () => {
  const asset = await contentful.getAsset('6MPuamYCrTMaP2hJu4t6WM');
  return asset.fields.file && `https:${asset.fields.file.url}`;
});

export const getPlatformProfiles = cache(async () => {
  const { items } = await contentful.getEntries<PlatformProfileSkeleton>({
    select: ['sys.id', 'fields'],
    content_type: 'platformProfile',
  });

  const platformProfiles = items.map((item) => ({
    ...item.fields,
    platform: item.fields.platform && {
      id: item.fields.platform.sys.id,
      name: item.fields.platform.fields.name,
    },
  }));

  return orderBy(platformProfiles, 'platform.name');
});

export const getSkillCategories = cache(async () => {
  const [{ items: skills }, { items: skillCategories }] = await Promise.all([
    contentful.getEntries<SkillSkeleton>({
      select: ['fields'],
      content_type: 'skill',
      'fields.category[exists]': true,
      order: ['-fields.proficiency', 'fields.name'],
    }),
    contentful.getEntries<SkillCategorySkeleton>({
      select: ['sys.id', 'fields.name'],
      content_type: 'skillCategory',
      order: ['-fields.proficiency', 'fields.name'],
    }),
  ]);

  return skillCategories.map((skillCategory) => ({
    id: skillCategory.sys.id,
    name: skillCategory.fields.name,
    skills: skills
      .filter((skill) => skill.fields.category?.sys.id === skillCategory.sys.id)
      .map((skill) => skill.fields.name),
  }));
});

const priorities = { priorityHigh: 1, priorityMedium: 2, priorityLow: 3 };
export const getTechStack = cache(async () => {
  const { items } = await contentful.getEntries<ProjectSkeleton>({
    select: ['fields.name', 'fields.url', 'metadata.tags'],
    content_type: 'project',
    'metadata.tags.sys.id[in]': ['techStack'],
    order: ['fields.name'],
  });

  return orderBy(items, (item) => {
    const priority = item.metadata.tags.find((tag) =>
      tag.sys.id.startsWith('priority'),
    );

    return priority && priorities[priority.sys.id as keyof typeof priorities];
  }).map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    url: item.fields.url,
  }));
});

export const getBlogMetadataById = cache(
  (id: string) => prisma.blogMetadata.findUnique({ where: { id } }),
  undefined,
  { revalidate: 3600 },
);

export const getBlogsMetadataByIds = cache(
  (ids: string[]) =>
    prisma.blogMetadata.findMany({ where: { id: { in: ids } } }),
  undefined,
  { revalidate: 3600 },
);
