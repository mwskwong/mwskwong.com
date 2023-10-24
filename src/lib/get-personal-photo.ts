import { unstable_cache as cache } from 'next/cache';

import { contentful } from './client';

export const getPersonalPhoto = cache(async () => {
  const asset = await contentful.getAsset('6MPuamYCrTMaP2hJu4t6WM');
  return asset.fields.file && `https:${asset.fields.file.url}`;
}, ['personalPhoto']);
