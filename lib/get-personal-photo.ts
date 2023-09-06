import { cache } from 'react';
import { client } from './client';

export const getPersonalPhoto = cache(async () => {
  const asset = await client.getAsset('6MPuamYCrTMaP2hJu4t6WM');
  return asset.fields.file && `https:${asset.fields.file.url}`;
});
