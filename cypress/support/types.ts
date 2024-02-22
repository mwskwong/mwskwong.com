import { EntryFieldTypes } from 'contentful';

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
