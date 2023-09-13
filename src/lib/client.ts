import { createClient } from 'contentful';
import 'server-only';

export const contentful = createClient({
  space: process.env.CF_SPACE_ID ?? '',
  accessToken:
    (process.env.NODE_ENV === 'development'
      ? process.env.CF_PREVIEW_ACCESS_TOKEN
      : process.env.CF_DELIVERY_ACCESS_TOKEN) ?? '',
  host:
    process.env.NODE_ENV === 'development'
      ? 'preview.contentful.com'
      : undefined,
  environment: process.env.VERCEL_ENV === 'production' ? 'master' : 'develop',
}).withoutUnresolvableLinks;
