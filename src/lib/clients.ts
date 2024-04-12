import { PrismaClient } from '@prisma/client';
import { createClient } from 'contentful';

export const cms = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
  environment: process.env.CONTENTFUL_ENVIRONMENT,
}).withoutUnresolvableLinks;

/**
 * @see {@link https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution}
 */

const prismaClientSingleton = () =>
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : undefined,
  });

declare global {
  // eslint-disable-next-line no-var -- needed for defining globalThis.dbGlobal
  var dbGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const db = globalThis.dbGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.dbGlobal = db;
}
