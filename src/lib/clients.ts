import { PrismaClient } from '@prisma/client';
import { createClient } from 'contentful';
import { Resend } from 'resend';

import { env } from '@/env.mjs';

export const contentful = createClient({
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
  // eslint-disable-next-line no-var -- needed for defining globalThis.prismaGlobal
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export const resend = new Resend(env.RESEND_API_KEY);
