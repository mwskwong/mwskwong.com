import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';
import { createClient } from 'contentful';

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken:
    (process.env.NODE_ENV === 'development'
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN) ?? '',
  host:
    process.env.NODE_ENV === 'development'
      ? 'preview.contentful.com'
      : undefined,
  environment: process.env.VERCEL_ENV === 'production' ? 'master' : 'develop',
}).withoutUnresolvableLinks;

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : undefined,
}).$extends(readReplicas({ url: process.env.DATABASE_REPLICA_URL ?? '' }));
