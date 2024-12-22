import { type EntryFieldTypes } from 'contentful';

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

export interface ProjectSkeleton {
  contentTypeId: 'project';
  fields: {
    name: EntryFieldTypes.Symbol;
    type: EntryFieldTypes.Symbol<'Library' | 'Platform' | 'Website'>;
    url: EntryFieldTypes.Symbol;
    thumbnail?: EntryFieldTypes.AssetLink;
    logo?: EntryFieldTypes.AssetLink;
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
    logoUniversal?: EntryFieldTypes.AssetLink;
    logoLight?: EntryFieldTypes.AssetLink;
    logoDark?: EntryFieldTypes.AssetLink;
  };
}
