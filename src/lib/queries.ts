import { orderBy } from 'lodash-es';
import { unstable_cache as nextCache } from 'next/cache';
import { connection } from 'next/server';
import { cache } from 'react';

import { cv, personalPhoto, privacyPolicy } from '@/constants/contentful-ids';

import { contentful, prisma } from './clients';
import {
  type BlogSkeleton,
  type CourseSkeleton,
  type EducationSkeleton,
  type ExperienceSkeleton,
  type PrivacyPolicy,
  type ProjectSkeleton,
  type SkillCategorySkeleton,
  type SkillSkeleton,
  type SocialMediaProfileSkeleton,
} from './types';

export const getBlogBySlug = cache(
  nextCache(async (slug: string) => {
    const { items } = await contentful.getEntries<BlogSkeleton>({
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
  }),
);

export const getBlogs = cache(
  nextCache(async () => {
    const { items } = await contentful.getEntries<BlogSkeleton>({
      content_type: 'blog',
      order: ['-sys.createdAt'],
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
      content: item.fields.content,
    }));
  }),
);

export const getContributedProjects = nextCache(async () => {
  const { items } = await contentful.getEntries<ProjectSkeleton>({
    content_type: 'project',
    'metadata.tags.sys.id[in]': ['contributed'],
    order: ['fields.name'],
  });

  return items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    url: item.fields.url,
    logo: {
      universal:
        item.fields.logoUniversal?.fields.file &&
        `https:${item.fields.logoUniversal.fields.file.url}`,
      light:
        item.fields.logoLight?.fields.file &&
        `https:${item.fields.logoLight.fields.file.url}`,
      dark:
        item.fields.logoDark?.fields.file &&
        `https:${item.fields.logoDark.fields.file.url}`,
    },
  }));
});

export const getCourses = nextCache(async () => {
  const { items } = await contentful.getEntries<CourseSkeleton>({
    content_type: 'course',
    order: ['fields.name'],
  });

  return items.map((item) => ({
    ...item.fields,
    institution: item.fields.institution && {
      id: item.fields.institution.sys.id,
      name: item.fields.institution.fields.name,
      logo: {
        universal:
          item.fields.institution.fields.logoUniversal?.fields.file &&
          `https:${item.fields.institution.fields.logoUniversal.fields.file.url}`,
        light:
          item.fields.institution.fields.logoLight?.fields.file &&
          `https:${item.fields.institution.fields.logoLight.fields.file.url}`,
        dark:
          item.fields.institution.fields.logoDark?.fields.file &&
          `https:${item.fields.institution.fields.logoDark.fields.file.url}`,
      },
    },
    certificate:
      item.fields.certificate?.fields.file &&
      `https:${item.fields.certificate.fields.file.url}`,
    categories: item.fields.categories,
  }));
});

export const getCv = nextCache(async () => {
  const asset = await contentful.getAsset(cv);
  return asset.fields.file && `https:${asset.fields.file.url}`;
});

export const getEducations = nextCache(async () => {
  // Goal: sort educations in DESC order by `to` date,
  // while having records with `to = undefined` (denote "Present") sorted at the top

  // Contentful always place undefined fields at the bottom,
  // so we first sort in ASC and then reverse it
  // such that it's in DESC order while undefined values are at the top
  const { items } = await contentful.getEntries<EducationSkeleton>({
    content_type: 'education',
    order: ['fields.to'],
  });

  items.reverse();

  return items.map((item) => ({
    ...item.fields,
    school: item.fields.school && {
      ...item.fields.school.fields,
      logo: {
        universal:
          item.fields.school.fields.logoUniversal?.fields.file &&
          `https:${item.fields.school.fields.logoUniversal.fields.file.url}`,
        light:
          item.fields.school.fields.logoLight?.fields.file &&
          `https:${item.fields.school.fields.logoLight.fields.file.url}`,
        dark:
          item.fields.school.fields.logoDark?.fields.file &&
          `https:${item.fields.school.fields.logoDark.fields.file.url}`,
      },
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

export const getExperiences = cache(
  nextCache(async () => {
    // Goal: sort educations in DESC order by `to` date,
    // while having records with `to = undefined` (denote "Present") sorted at the top

    // Contentful always place undefined fields at the bottom,
    // so we first sort in ASC and then reverse it
    // such that it's in DESC order while undefined values are at the top
    const { items } = await contentful.getEntries<ExperienceSkeleton>({
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
      company: item.fields.company && {
        ...item.fields.company.fields,
        logo: {
          universal:
            item.fields.company.fields.logoUniversal?.fields.file &&
            `https:${item.fields.company.fields.logoUniversal.fields.file.url}`,
          light:
            item.fields.company.fields.logoLight?.fields.file &&
            `https:${item.fields.company.fields.logoLight.fields.file.url}`,
          dark:
            item.fields.company.fields.logoDark?.fields.file &&
            `https:${item.fields.company.fields.logoDark.fields.file.url}`,
        },
      },
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
        .filter(Boolean)
        .map((skill) => ({ name: skill.fields.name, url: skill.fields.url })),
    }));
  }),
);

export const getPersonalPhoto = cache(
  nextCache(async () => {
    const asset = await contentful.getAsset(personalPhoto);
    return asset.fields.file && `https:${asset.fields.file.url}`;
  }),
);

export const getSocialMediaProfiles = cache(
  nextCache(async () => {
    const { items } = await contentful.getEntries<SocialMediaProfileSkeleton>({
      content_type: 'socialMediaProfile',
    });

    const socialMediaProfiles = items.map((item) => ({
      ...item.fields,
      socialMedia: item.fields.socialMedia && {
        id: item.fields.socialMedia.sys.id,
        name: item.fields.socialMedia.fields.name,
      },
    }));

    return orderBy(socialMediaProfiles, 'socialMedia.name');
  }),
);

export const getSkillSet = nextCache(async () => {
  const [{ items: skills }, { items: skillCategories }] = await Promise.all([
    contentful.getEntries<SkillSkeleton>({
      content_type: 'skill',
      'fields.category[exists]': true,
      order: ['-fields.proficiency', 'fields.name'],
    }),
    contentful.getEntries<SkillCategorySkeleton>({
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

export const getTechStack = nextCache(async () => {
  const { items } = await contentful.getEntries<ProjectSkeleton>({
    content_type: 'project',
    'metadata.tags.sys.id[in]': ['techStack'],
    order: ['fields.type', 'fields.name'],
  });

  return items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    url: item.fields.url,
    logo: {
      universal:
        item.fields.logoUniversal?.fields.file &&
        `https:${item.fields.logoUniversal.fields.file.url}`,
      light:
        item.fields.logoLight?.fields.file &&
        `https:${item.fields.logoLight.fields.file.url}`,
      dark:
        item.fields.logoDark?.fields.file &&
        `https:${item.fields.logoDark.fields.file.url}`,
    },
  }));
});

export const getPrivacyPolicy = cache(
  nextCache(async () => {
    const entry = await contentful.getEntry<PrivacyPolicy>(privacyPolicy);

    return {
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
      content: entry.fields.content,
    };
  }),
);

export const getBlogsMetadata = cache(async () => {
  await connection();
  return await prisma.blogMetadata.findMany();
});

export const getBlogMetadataById = async (id: string) => {
  await connection();
  return await prisma.blogMetadata.findUnique({ where: { id } });
};

// prevent using Next.js cache to for this despite technically we can + revalidate when new submission happened.
// this allows moderation on PROD by directly updating the prisma
// Also using React.cache here because both JSON+LD and the UI needs this data
export const getGuestbookSubmissions = cache(async () => {
  await connection();
  return await prisma.contactFormSubmission.findMany({
    where: { showInGuestbook: true },
    orderBy: { submittedAt: 'asc' },
  });
});
