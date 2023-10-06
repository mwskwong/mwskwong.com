import 'server-only';

import { connect } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from '@prisma/client';

const connection = connect({
  url: process.env.DATABASE_URL,
  // WORKAROUND: prevent explicit cache
  // https://github.com/planetscale/database-js/pull/102#issuecomment-1646372799
  fetch: (url, init) => {
    delete init?.cache;
    return fetch(url, init);
  },
});
const adapter = new PrismaPlanetScale(connection);
export const prisma = new PrismaClient({ adapter });
