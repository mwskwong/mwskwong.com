import 'server-only';

import { connect } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from '@prisma/client';
import { fetch } from 'undici';

const connection = connect({ url: process.env.DATABASE_URL, fetch });
const adapter = new PrismaPlanetScale(connection);
export const prisma = new PrismaClient({ adapter });
