import 'server-only';

import { connect } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from '@prisma/client';
import { fetch as undiciFetch } from 'undici';

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  fetch: undiciFetch,
});
const adapter = new PrismaPlanetScale(connection);
export const prisma = new PrismaClient({ adapter });
