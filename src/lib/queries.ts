import { cv, personalPortrait } from '@/constants/contentful-ids';

import { contentful } from './clients';

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
