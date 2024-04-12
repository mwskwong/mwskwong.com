import { headers } from 'next/headers';

import { db } from '@/lib/clients';

export const GET = async () => {
  const authorization = headers().get('Authorization');
  if (
    process.env.CRON_SECRET &&
    authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return Response.json({ status: 1 }, { status: 401 });
  }

  const tables = await db.$queryRaw<
    { tablename: string }[]
  >`SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'`;
  await db.$executeRawUnsafe(
    `VACUUM ANALYZE ${tables.map(({ tablename }) => tablename).join(', ')}`,
  );

  return Response.json({ status: 0 });
};
