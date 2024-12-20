import { cv, personalPortrait } from '@/constants/contentful-ids';

import { contentful } from './clients';
import { type ProjectSkeleton } from './contentful-types';

export const getPersonalPortrait = async () => {
  'use cache';

  const asset = await contentful.getAsset(personalPortrait);
  return {
    url: asset.fields.file && `https:${asset.fields.file.url}`,
    contentType: asset.fields.file?.contentType,
  };
};

export const getCv = async () => {
  'use cache';

  const asset = await contentful.getAsset(cv);
  return asset.fields.file && `https:${asset.fields.file.url}`;
};

export const getTechStack = async () => {
  'use cache';

  const { items } = await contentful.getEntries<ProjectSkeleton>({
    content_type: 'project',
    'metadata.tags.sys.id[in]': ['techStack'],
    order: ['fields.name'],
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
