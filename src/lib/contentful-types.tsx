import { type EntryFieldTypes } from 'contentful';

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
