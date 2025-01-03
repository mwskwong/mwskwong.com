import { contentful, prisma } from "./clients";
import {
  type ArticleSkeleton,
  type CourseCategory,
  type CourseSkeleton,
  type EducationSkeleton,
  type ExperienceSkeleton,
  type ProjectSkeleton,
  type SkillCategorySkeleton,
  type SkillSkeleton,
} from "./contentful-types";
import { cache, generatePdfThumbnail } from "./utils";
import { personalPortrait, resume } from "@/constants/contentful-ids";

export const getPersonalPortrait = cache(async () => {
  const asset = await contentful.getAsset(personalPortrait);

  return {
    url: asset.fields.file && `https:${asset.fields.file.url}`,
    contentType: asset.fields.file?.contentType,
  };
});

export const getResume = cache(async () => {
  const asset = await contentful.getAsset(resume);
  return asset.fields.file && `https:${asset.fields.file.url}`;
});

export const getSkillSet = cache(async () => {
  const [{ items: skills }, { items: skillCategories }] = await Promise.all([
    contentful.getEntries<SkillSkeleton>({
      content_type: "skill",
      "fields.category[exists]": true,
      order: ["fields.name"],
    }),
    contentful.getEntries<SkillCategorySkeleton>({
      content_type: "skillCategory",
      order: ["-fields.proficiency", "fields.name"],
    }),
  ]);

  return skillCategories.map((skillCategory) => ({
    id: skillCategory.sys.id,
    name: skillCategory.fields.name,
    skills: skills
      .filter((skill) => skill.fields.category?.sys.id === skillCategory.sys.id)
      .map((skill) => ({
        id: skill.sys.id,
        name: skill.fields.name,
        proficiency: skill.fields.proficiency,
        url: skill.fields.url,
      })),
  }));
});

export const getExperiences = cache(async () => {
  // Goal: sort experience in DESC order by `to` date,
  // while having records with `to = undefined` (denote "Present") sorted at the top

  // Contentful always place undefined fields at the bottom,
  // so we first sort in ASC and then reverse it
  // such that it's in DESC order while undefined values are at the top
  const { items } = await contentful.getEntries<ExperienceSkeleton>({
    content_type: "experience",
    order: ["fields.to"],
  });

  items.reverse();
  for (const item of items) {
    item.fields.skills.sort((a, b) => {
      if (a && b) {
        return a.fields.name.localeCompare(b.fields.name, undefined, {
          sensitivity: "base",
        });
      }

      return -1;
    });
  }

  return items.map((item) => ({
    id: item.sys.id,
    ...item.fields,
    company: item.fields.company && {
      name: item.fields.company.fields.name,
      url: item.fields.company.fields.url,
    },
    projects: item.fields.projects?.map((project) => ({
      name: project?.fields.name,
      url: project?.fields.url,
      thumbnail:
        project?.fields.thumbnail?.fields.file &&
        `https:${project.fields.thumbnail.fields.file.url}`,
    })),
    supportingDocuments: item.fields.supportingDocuments?.map(
      (supportingDocument) => ({
        name: supportingDocument?.fields.title,
        url:
          supportingDocument?.fields.file &&
          `https:${supportingDocument.fields.file.url}`,
        thumbnail:
          supportingDocument?.fields.file &&
          generatePdfThumbnail(`https:${supportingDocument.fields.file.url}`),
      }),
    ),
    skills: item.fields.skills
      .filter(Boolean)
      .map((skill) => ({ name: skill.fields.name, url: skill.fields.url })),
  }));
});

export const getEducations = cache(async () => {
  // Goal: sort educations in DESC order by `to` date,
  // while having records with `to = undefined` (denote "Present") sorted at the top

  // Contentful always place undefined fields at the bottom,
  // so we first sort in ASC and then reverse it
  // such that it's in DESC order while undefined values are at the top
  const { items } = await contentful.getEntries<EducationSkeleton>({
    content_type: "education",
    order: ["fields.to"],
  });

  items.reverse();

  return items.map((item) => ({
    id: item.sys.id,
    ...item.fields,
    school: item.fields.school && {
      name: item.fields.school.fields.name,
      url: item.fields.school.fields.url,
    },
    grade: item.fields.grade,
    supportingDocuments: item.fields.supportingDocuments?.map(
      (supportingDocument) => ({
        name: supportingDocument?.fields.title,
        url:
          supportingDocument?.fields.file &&
          `https:${supportingDocument.fields.file.url}`,
        thumbnail:
          supportingDocument?.fields.file &&
          generatePdfThumbnail(`https:${supportingDocument.fields.file.url}`),
      }),
    ),
  }));
});

export const getArticles = cache(async () => {
  const [{ items }, articlesMetadata] = await Promise.all([
    contentful.getEntries<ArticleSkeleton>({
      content_type: "blog",
      order: ["-sys.createdAt"],
    }),
    prisma.articleMetadata.findMany(),
  ]);

  return items.map((item) => ({
    id: item.sys.id,
    createdAt: item.sys.createdAt,
    updatedAt: item.sys.updatedAt,
    coverPhoto:
      item.fields.coverPhoto?.fields.file &&
      `https:${item.fields.coverPhoto.fields.file.url}`,
    title: item.fields.title,
    slug: item.fields.slug,
    description: item.fields.description,
    view: articlesMetadata.find(({ id }) => id === item.sys.id)?.view ?? 0,
  }));
});

export const getArticleBySlug = cache(async (slug: string) => {
  const { items } = await contentful.getEntries<ArticleSkeleton>({
    content_type: "blog",
    "fields.slug[in]": [slug],
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
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
      content: item.fields.content,
    }
  );
});

export const getContributedProjects = cache(async () => {
  const { items } = await contentful.getEntries<ProjectSkeleton>({
    content_type: "project",
    "metadata.tags.sys.id[in]": ["contributed"],
    order: ["fields.name"],
  });

  return items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    url: item.fields.url,
    logo:
      item.fields.logo?.fields.file &&
      `https:${item.fields.logo.fields.file.url}`,
  }));
});

export const getCourseCategories = cache(async () => {
  const course = await contentful.getContentType("course");

  return course.fields
    .find(({ id }) => id === "categories")
    ?.items?.validations[0]?.in?.toSorted() as CourseCategory[] | undefined;
});

export const getCourses = cache(async () => {
  const { items } = await contentful.getEntries<CourseSkeleton>({
    content_type: "course",
    order: ["fields.name"],
  });

  return items.map((item) => ({
    id: item.sys.id,
    ...item.fields,
    institution: item.fields.institution && {
      id: item.fields.institution.sys.id,
      name: item.fields.institution.fields.name,
      logo:
        item.fields.institution.fields.logo?.fields.file &&
        `https:${item.fields.institution.fields.logo.fields.file.url}`,
    },
    certificate:
      item.fields.certificate?.fields.file &&
      `https:${item.fields.certificate.fields.file.url}`,
    categories: item.fields.categories,
  }));
});
