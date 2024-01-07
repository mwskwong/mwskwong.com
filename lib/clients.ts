import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';
import { createClient } from 'contentful';

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
  environment: process.env.VERCEL_ENV === 'production' ? 'master' : 'develop',
}).withoutUnresolvableLinks;

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : undefined,
}).$extends(readReplicas({ url: process.env.DATABASE_REPLICA_URL ?? '' }));
