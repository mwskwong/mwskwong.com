import { EntryFieldTypes } from "contentful";

export interface BlogCategorySkeleton {
  contentTypeId: "blogCategory";
  fields: {
    name: EntryFieldTypes.Symbol;
  };
}

export interface BlogSkeleton {
  contentTypeId: "blog";
  fields: {
    coverPhoto: EntryFieldTypes.AssetLink;
    categories?: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<BlogCategorySkeleton>
    >;
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    content?: EntryFieldTypes.Text;
  };
}

export interface CourseCategorySkeleton {
  contentTypeId: "courseCategory";
  fields: {
    name: EntryFieldTypes.Symbol;
  };
}

export interface CourseSkeleton {
  contentTypeId: "course";
  fields: {
    name: EntryFieldTypes.Symbol;
    institution: EntryFieldTypes.EntryLink<OrganizationSkeleton>;
    certificate?: EntryFieldTypes.AssetLink;
    categories?: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<CourseCategorySkeleton>
    >;
  };
}

export interface EducationSkeleton {
  contentTypeId: "education";
  fields: {
    from: EntryFieldTypes.Date;
    to?: EntryFieldTypes.Date;
    program: EntryFieldTypes.Symbol;
    school: EntryFieldTypes.EntryLink<OrganizationSkeleton>;
    mode: EntryFieldTypes.Symbol;
    supportingDocuments?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  };
}

export interface ExperienceSkeleton {
  contentTypeId: "experience";
  fields: {
    from: EntryFieldTypes.Date;
    to?: EntryFieldTypes.Date;
    jobTitle: EntryFieldTypes.Symbol;
    companies: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<OrganizationSkeleton>
    >;
    companiesRelationship?: EntryFieldTypes.Symbol;
    employmentType: EntryFieldTypes.Symbol;
    jobDuties?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    supportingDocuments?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    skills: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<SkillSkeleton>>;
  };
}

export interface OrganizationSkeleton {
  contentTypeId: "organization";
  fields: {
    name: EntryFieldTypes.Symbol;
    url?: EntryFieldTypes.Symbol;
    logo?: EntryFieldTypes.AssetLink;
  };
}

export interface PlatformProfileSkeleton {
  contentTypeId: "platformProfile";
  fields: {
    platform: EntryFieldTypes.EntryLink<OrganizationSkeleton>;
    url: EntryFieldTypes.Symbol;
  };
}

export interface SkillSkeleton {
  contentTypeId: "skill";
  fields: {
    name: EntryFieldTypes.Symbol;
    category?: EntryFieldTypes.EntryLink<SkillCategorySkeleton>;
    proficiency: EntryFieldTypes.Integer;
  };
}

export interface SkillCategorySkeleton {
  contentTypeId: "skillCategory";
  fields: {
    name: EntryFieldTypes.Symbol;
    proficiency: EntryFieldTypes.Integer;
  };
}
