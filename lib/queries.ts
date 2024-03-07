import { Entry } from 'contentful';
import { desc, eq, inArray } from 'drizzle-orm';
import { orderBy } from 'lodash-es';
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache';
import { cache as reactCache } from 'react';

import { cv, privacyPolicy } from '@/constants/contentful-ids';
import { blogMetadata, contactFormSubmission } from '@/db/schema';

import { cms, db } from './clients';
import {
  BlogSkeleton,
  CourseSkeleton,
  EducationSkeleton,
  ExperienceSkeleton,
  OrganizationSkeleton,
  PlatformProfileSkeleton,
  PrivacyPolicy,
  ProjectSkeleton,
  SkillCategorySkeleton,
  SkillSkeleton,
} from './types';

export const getBlogBySlug = cache(async (slug: string) => {
  const { items } = await cms.getEntries<BlogSkeleton>({
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
      categories: item.fields.categories,
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
    const { items } = await cms.getEntries<BlogSkeleton>({
      content_type: 'blog',
      order: ['-sys.createdAt'],
      skip: pagination && (page - 1) * pageSize,
      limit: pagination && pageSize,
    });

    return items.map((item) => ({
      id: item.sys.id,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
      coverPhoto:
        item.fields.coverPhoto?.fields.file &&
        `https:${item.fields.coverPhoto.fields.file.url}`,
      categories: item.fields.categories,
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
    }));
  },
);

export const getContributedProjects = cache(async () => {
  const { items } = await cms.getEntries<ProjectSkeleton>({
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
  const { items } = await cms.getEntries<CourseSkeleton>({
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
    categories: item.fields.categories,
  }));
});

export const getCv = cache(async () => {
  const asset = await cms.getAsset(cv);
  return asset.fields.file && `https:${asset.fields.file.url}`;
});

export const getEducations = cache(async () => {
  // Goal: sort educations in DESC order by `to` date,
  // while having records with `to = undefined` (denote "Present") sorted at the top

  // Contentful always place undefined fields at the bottom,
  // so we first sort in ASC and then reverse it
  // such that it's in DESC order while undefined values are at the top
  const { items } = await cms.getEntries<EducationSkeleton>({
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
        url:
          supportingDocument?.fields.file &&
          `https:${supportingDocument.fields.file.url}`,
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
  const { items } = await cms.getEntries<ExperienceSkeleton>({
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
      thumbnail:
        project?.fields.thumbnail?.fields.file &&
        `https:${project.fields.thumbnail.fields.file.url}`,
    })),
    supportingDocuments: item.fields.supportingDocuments?.map(
      (supportingDocument) => ({
        title: supportingDocument?.fields.title,
        url:
          supportingDocument?.fields.file &&
          `https:${supportingDocument.fields.file.url}`,
      }),
    ),
    skills: item.fields.skills
      .filter(
        (elem): elem is Entry<SkillSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'> =>
          Boolean(elem),
      )
      .map((skill) => ({ name: skill.fields.name, url: skill.fields.url })),
  }));
});

export const getPersonalPhoto = cache(async () => {
  const asset = await cms.getAsset('6MPuamYCrTMaP2hJu4t6WM');
  return asset.fields.file && `https:${asset.fields.file.url}`;
});

export const getPlatformProfiles = cache(async () => {
  const { items } = await cms.getEntries<PlatformProfileSkeleton>({
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

export const getSkillSet = cache(async () => {
  const [{ items: skills }, { items: skillCategories }] = await Promise.all([
    cms.getEntries<SkillSkeleton>({
      content_type: 'skill',
      'fields.category[exists]': true,
      order: ['-fields.proficiency', 'fields.name'],
    }),
    cms.getEntries<SkillCategorySkeleton>({
      content_type: 'skillCategory',
      order: ['-fields.proficiency', 'fields.name'],
    }),
  ]);

  return skillCategories.map((skillCategory) => ({
    id: skillCategory.sys.id,
    name: skillCategory.fields.name,
    skills: skills
      .filter((skill) => skill.fields.category?.sys.id === skillCategory.sys.id)
      .map((skill) => ({
        name: skill.fields.name,
        proficiency: skill.fields.proficiency,
        url: skill.fields.url,
      })),
  }));
});

export const getTechStack = cache(async () => {
  const { items } = await cms.getEntries<ProjectSkeleton>({
    content_type: 'project',
    'metadata.tags.sys.id[in]': ['techStack'],
    order: ['fields.type', 'fields.name'],
  });

  return items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    url: item.fields.url,
  }));
});

export const getPrivacyPolicy = cache(async () => {
  const entry = await cms.getEntry<PrivacyPolicy>(privacyPolicy);

  return {
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    content: entry.fields.content,
  };
});

// Use React.cache here, because we want to achieve the following
//   1. DB is queried only once in the blog listing page
//   2. The result of getBlogsMetadataByIds is NOT cached in other server requests
//      i.e. when the user refreshes the page or other users visit the same page,
//      it should see the metadata updated
// It works, because React will invalidate the cache for all memoized functions for each server request.
// See https://react.dev/reference/react/cache#caveats
export const getBlogsMetadataByIds = reactCache((ids: string[]) => {
  noStore();
  return db.select().from(blogMetadata).where(inArray(blogMetadata.id, ids));
});

export const getBlogMetadataById = (id: string) => {
  noStore();
  return db.select().from(blogMetadata).where(eq(blogMetadata.id, id));
};

// prevent using Next.js cache to for this despite technically we can + revalidate when new submission happened.
// this allows moderation on PROD by directly updating the DB
// Also using React.cache here because both JSON+LD and the UI needs this data
export const getGuestbookSubmissions = reactCache(() => {
  noStore();
  return db
    .select()
    .from(contactFormSubmission)
    .where(eq(contactFormSubmission.showInGuestbook, true))
    .orderBy(desc(contactFormSubmission.submittedAt));
});
