import { personalPortrait, resume } from "@/constants/contentful-ids";

import { cms, db } from "./clients";
import {
  type BlogPostSkeleton,
  type CourseCategory,
  type CourseSkeleton,
  type EducationSkeleton,
  type ExperienceSkeleton,
  type ProjectSkeleton,
  type SkillCategorySkeleton,
  type SkillSkeleton,
} from "./contentful-types";
import { blogPostMetadata } from "./schema";
import { generatePdfThumbnail } from "./utils";

export const getPersonalPortrait = async () => {
  "use cache";

  const asset = await cms.getAsset(personalPortrait);
  return asset.fields.file && `https:${asset.fields.file.url}`;
};

export const getResume = async () => {
  "use cache";

  const asset = await cms.getAsset(resume);
  return asset.fields.file && `https:${asset.fields.file.url}`;
};

export const getSkillSet = async () => {
  "use cache";

  const [{ items: skills }, { items: skillCategories }] = await Promise.all([
    cms.getEntries<SkillSkeleton>({
      content_type: "skill",
      "fields.category[exists]": true,
      order: ["fields.name"],
    }),
    cms.getEntries<SkillCategorySkeleton>({
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
};

export const getExperiences = async () => {
  "use cache";

  // Goal: sort experience in DESC order by `to` date,
  // while having records with `to = undefined` (denote "Present") sorted at the top

  // Contentful always place undefined fields at the bottom,
  // so we first sort in ASC and then reverse it
  // such that it's in DESC order while undefined values are at the top
  const { items } = await cms.getEntries<ExperienceSkeleton>({
    content_type: "experience",
    order: ["fields.to"],
  });

  items.reverse();
  for (const item of items) {
    item.fields.skills?.sort((a, b) => {
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
    from: new Date(item.fields.from),
    to: item.fields.to && new Date(item.fields.to),
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
      ?.filter(Boolean)
      .map((skill) => ({ name: skill.fields.name, url: skill.fields.url })),
  }));
};

export const getEducations = async () => {
  "use cache";

  // Goal: sort educations in DESC order by `to` date,
  // while having records with `to = undefined` (denote "Present") sorted at the top

  // Contentful always place undefined fields at the bottom,
  // so we first sort in ASC and then reverse it
  // such that it's in DESC order while undefined values are at the top
  const { items } = await cms.getEntries<EducationSkeleton>({
    content_type: "education",
    order: ["fields.to"],
  });

  items.reverse();

  return items.map((item) => ({
    id: item.sys.id,
    ...item.fields,
    from: new Date(item.fields.from),
    to: item.fields.to && new Date(item.fields.to),
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
};

export const getBlogPosts = async () => {
  "use cache";

  const [{ items }, blogPostsMetadata] = await Promise.all([
    cms.getEntries<BlogPostSkeleton>({
      content_type: "blogPost",
      order: ["-fields.publishedAt"],
    }),
    db.select().from(blogPostMetadata),
  ]);

  return items.map((item) => ({
    id: item.sys.id,
    publishedAt: new Date(item.fields.publishedAt),
    updatedAt: new Date(item.sys.updatedAt),
    coverImage:
      item.fields.coverImage?.fields.file &&
      `https:${item.fields.coverImage.fields.file.url}`,
    title: item.fields.title,
    slug: item.fields.slug,
    summary: item.fields.summary,
    view: blogPostsMetadata.find(({ id }) => id === item.sys.id)?.view ?? 0,
  }));
};

export const getBlogPostBySlug = async (slug: string) => {
  "use cache";

  const { items } = await cms.getEntries<BlogPostSkeleton>({
    content_type: "blogPost",
    "fields.slug[in]": [slug],
    limit: 1,
  });

  const item = items[0];
  return (
    item && {
      id: item.sys.id,
      publishedAt: new Date(item.fields.publishedAt),
      updatedAt: new Date(item.sys.updatedAt),
      coverImage:
        item.fields.coverImage?.fields.file &&
        `https:${item.fields.coverImage.fields.file.url}`,
      title: item.fields.title,
      slug: item.fields.slug,
      summary: item.fields.summary,
      content: item.fields.content,
    }
  );
};

export const getContributedProjects = async () => {
  "use cache";

  const { items } = await cms.getEntries<ProjectSkeleton>({
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
};

export const getCourseCategories = async () => {
  "use cache";

  const course = await cms.getContentType("course");

  return course.fields
    .find(({ id }) => id === "categories")
    ?.items?.validations[0]?.in?.toSorted() as CourseCategory[] | undefined;
};

export const getCourses = async () => {
  "use cache";

  const { items } = await cms.getEntries<CourseSkeleton>({
    content_type: "course",
    order: ["fields.name"],
  });

  return items.map((item) => ({
    id: item.sys.id,
    ...item.fields,
    completedOn: new Date(item.fields.completedOn),
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
};
