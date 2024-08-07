import { headers } from 'next/headers';

import { prisma } from '@/lib/clients';

// Vercel Cron Jobs need to be GET requests
export const GET = async () => {
  const authorization = headers().get('Authorization');
  if (
    process.env.CRON_SECRET &&
    authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return Response.json({ status: 1 }, { status: 401 });
  }

  const tables = await prisma.$queryRaw<
    { tablename: string }[]
  >`SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'`;
  await prisma.$executeRawUnsafe(
    `VACUUM ANALYZE ${tables.map(({ tablename }) => tablename).join(', ')}`,
  );

  return Response.json({ status: 0 });
};
