import { type EntryFieldTypes, type EntrySkeletonType } from "contentful";

export type ArticleSkeleton = EntrySkeletonType<
  {
    coverPhoto: EntryFieldTypes.AssetLink;
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    content?: EntryFieldTypes.Text;
  },
  "blog"
>;

export type CourseCategory =
  | "Database"
  | "Desktop Virtualization"
  | "DevOps"
  | "Development"
  | "Marketing"
  | "Operating System"
  | "Project Management"
  | "Security";

export type CourseSkeleton = EntrySkeletonType<
  {
    name: EntryFieldTypes.Symbol;
    institution: EntryFieldTypes.EntryLink<OrganizationSkeleton>;
    certificate?: EntryFieldTypes.AssetLink;
    categories?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<CourseCategory>>;
    completedOn: EntryFieldTypes.Date;
  },
  "course"
>;

export type EducationSkeleton = EntrySkeletonType<
  {
    from: EntryFieldTypes.Date;
    to?: EntryFieldTypes.Date;
    program: EntryFieldTypes.Symbol;
    school: EntryFieldTypes.EntryLink<OrganizationSkeleton>;
    grade?: EntryFieldTypes.Symbol;
    supportingDocuments?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  },
  "education"
>;

export type ExperienceSkeleton = EntrySkeletonType<
  {
    from: EntryFieldTypes.Date;
    to?: EntryFieldTypes.Date;
    jobTitle: EntryFieldTypes.Symbol;
    company: EntryFieldTypes.EntryLink<OrganizationSkeleton>;
    jobDuties?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    projects?: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<ProjectSkeleton>
    >;
    supportingDocuments?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    skills?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<SkillSkeleton>>;
  },
  "experience"
>;

export type OrganizationSkeleton = EntrySkeletonType<
  {
    name: EntryFieldTypes.Symbol;
    url?: EntryFieldTypes.Symbol;
    logo?: EntryFieldTypes.AssetLink;
  },
  "organization"
>;

export type ProjectSkeleton = EntrySkeletonType<
  {
    name: EntryFieldTypes.Symbol;
    type: EntryFieldTypes.Symbol<"Library" | "Platform" | "Website">;
    url: EntryFieldTypes.Symbol;
    thumbnail?: EntryFieldTypes.AssetLink;
    logo?: EntryFieldTypes.AssetLink;
  },
  "project"
>;

export type SkillSkeleton = EntrySkeletonType<
  {
    name: EntryFieldTypes.Symbol;
    category?: EntryFieldTypes.EntryLink<SkillCategorySkeleton>;
    proficiency: EntryFieldTypes.Integer;
    url?: EntryFieldTypes.Symbol;
  },
  "skill"
>;

export type SkillCategorySkeleton = EntrySkeletonType<
  {
    name: EntryFieldTypes.Symbol;
    proficiency?: EntryFieldTypes.Integer;
  },
  "skillCategory"
>;
