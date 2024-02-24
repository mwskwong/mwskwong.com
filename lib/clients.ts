import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';
import { createClient } from 'contentful';

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
  environment: process.env.VERCEL_ENV === 'production' ? 'master' : 'develop',
}).withoutUnresolvableLinks;

/**
 * Prevent Next.js dev server keep re-initializing the prisma client
 * @see {@link https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices}
 */
declare global {
  // eslint-disable-next-line no-var -- needed for globalThis.prisma to be defined in the global scope.
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prismaClientSingleton = () =>
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : undefined,
  }).$extends(readReplicas({ url: process.env.DATABASE_REPLICA_URL ?? '' }));

export const prisma = globalThis.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
