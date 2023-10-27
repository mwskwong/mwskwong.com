import { unstable_cache as cache } from 'next/cache';

import { contentful } from './client';

export const getCv = cache(async () => {
  const asset = await contentful.getAsset('6mTh13ou7wM2Cs7ZC1tcdn');
  return asset.fields.file && `https:${asset.fields.file.url}`;
}, [process.env.VERCEL_GIT_COMMIT_REF ?? '']);
