import { PrismaClient } from '@prisma/client';
import { createClient } from 'contentful';

export const cms = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
  environment: process.env.VERCEL_ENV === 'production' ? 'master' : 'develop',
}).withoutUnresolvableLinks;

/**@see {@link https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution} */
const prismaClientSingleton = () => new PrismaClient();

declare global {
  // eslint-disable-next-line no-var -- needed for accessing globalThis.db
  var db: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const db = globalThis.db ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.db = db;
