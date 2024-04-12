import { PrismaClient } from '@prisma/client';
import { createClient } from 'contentful';

import { env } from '@/env.mjs';

export const cms = createClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.CONTENTFUL_ACCESS_TOKEN,
  environment: env.CONTENTFUL_ENVIRONMENT,
}).withoutUnresolvableLinks;

/**
 * @see {@link https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution}
 */

const prismaClientSingleton = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === 'production'
        ? undefined
        : ['query', 'info', 'warn', 'error'],
  });

declare global {
  // eslint-disable-next-line no-var -- needed for defining globalThis.dbGlobal
  var dbGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const db = globalThis.dbGlobal ?? prismaClientSingleton();

if (env.NODE_ENV !== 'production') {
  globalThis.dbGlobal = db;
}
