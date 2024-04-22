import { type EntryFieldTypes } from 'contentful';

export interface BlogSkeleton {
  contentTypeId: 'blog';
  fields: {
    coverPhoto: EntryFieldTypes.AssetLink;
    categories?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    content?: EntryFieldTypes.Text;
  };
}

export interface CourseSkeleton {
  contentTypeId: 'course';
  fields: {
    name: EntryFieldTypes.Symbol;
    institution: EntryFieldTypes.EntryLink<OrganizationSkeleton>;
    certificate?: EntryFieldTypes.AssetLink;
    categories?: EntryFieldTypes.Array<
      EntryFieldTypes.Symbol<
        | 'Database'
        | 'Desktop Virtualization'
        | 'Development'
        | 'DevOps'
        | 'Marketing'
        | 'Operating System'
        | 'Project Management'
        | 'Security'
      >
    >;
  };
}

export interface EducationSkeleton {
  contentTypeId: 'education';
  fields: {
    from: EntryFieldTypes.Date;
    to?: EntryFieldTypes.Date;
    program: EntryFieldTypes.Symbol;
    school: EntryFieldTypes.EntryLink<OrganizationSkeleton>;
    grade?: EntryFieldTypes.Symbol;
    supportingDocuments?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  };
}

export interface ExperienceSkeleton {
  contentTypeId: 'experience';
  fields: {
    from: EntryFieldTypes.Date;
    to?: EntryFieldTypes.Date;
    jobTitle: EntryFieldTypes.Symbol;
    company: EntryFieldTypes.EntryLink<OrganizationSkeleton>;
    jobDuties?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    projects?: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<ProjectSkeleton>
    >;
    supportingDocuments?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    skills: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<SkillSkeleton>>;
  };
}

export interface OrganizationSkeleton {
  contentTypeId: 'organization';
  fields: {
    name: EntryFieldTypes.Symbol;
    url?: EntryFieldTypes.Symbol;
    logo?: EntryFieldTypes.AssetLink;
  };
}

export interface PlatformProfileSkeleton {
  contentTypeId: 'platformProfile';
  fields: {
    platform: EntryFieldTypes.EntryLink<OrganizationSkeleton>;
    url: EntryFieldTypes.Symbol;
  };
}

export interface ProjectSkeleton {
  contentTypeId: 'project';
  fields: {
    name: EntryFieldTypes.Symbol;
    type: EntryFieldTypes.Symbol<'Library' | 'Platform' | 'Website'>;
    url: EntryFieldTypes.Symbol;
    thumbnail?: EntryFieldTypes.AssetLink;
    logoUniversal?: EntryFieldTypes.AssetLink;
    logoLight?: EntryFieldTypes.AssetLink;
    logoDark?: EntryFieldTypes.AssetLink;
  };
}

export interface SkillSkeleton {
  contentTypeId: 'skill';
  fields: {
    name: EntryFieldTypes.Symbol;
    category?: EntryFieldTypes.EntryLink<SkillCategorySkeleton>;
    proficiency: EntryFieldTypes.Integer;
    url?: EntryFieldTypes.Symbol;
  };
}

export interface SkillCategorySkeleton {
  contentTypeId: 'skillCategory';
  fields: {
    name: EntryFieldTypes.Symbol;
    proficiency?: EntryFieldTypes.Integer;
  };
}

export interface PrivacyPolicy {
  contentTypeId: 'privacyPolicy';
  fields: {
    content?: EntryFieldTypes.Text;
  };
}
