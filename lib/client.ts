import { createClient } from 'contentful';
import 'server-only';

export const client = createClient({
  space: process.env.CF_SPACE_ID ?? '',
  accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN ?? '',
  environment: process.env.VERCEL_ENV === 'production' ? 'master' : 'develop',
}).withoutUnresolvableLinks;
