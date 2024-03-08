import { neon } from '@neondatabase/serverless';
import { createClient } from 'contentful';
import { drizzle } from 'drizzle-orm/neon-http';

export const cms = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
  environment: process.env.VERCEL_ENV === 'production' ? 'master' : 'develop',
}).withoutUnresolvableLinks;

export const db = drizzle(neon(process.env.DATABASE_URL ?? ''));
