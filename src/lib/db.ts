import 'server-only';

import { connect } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';

const connection = connect({
  url: process.env.DATABASE_URL,
  // WORKAROUND: remove cache = no-store to allow Next.js to cache queries
  fetch: (url, init) => {
    delete init?.cache;
    return fetch(url, init);
  },
});
const adapter = new PrismaPlanetScale(connection);
// @ts-expect-error bug from Prisma TS type
export const prisma = new PrismaClient({ adapter }).$extends(
  readReplicas({ url: process.env.DATABASE_REPLICA_URL ?? '' }),
);
