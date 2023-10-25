import 'server-only';

import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';

export const prisma = new PrismaClient().$extends(
  readReplicas({ url: process.env.DATABASE_REPLICA_URL ?? '' }),
);
