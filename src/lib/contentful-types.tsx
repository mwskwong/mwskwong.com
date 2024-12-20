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
