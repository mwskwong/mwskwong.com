import { db } from '@/lib/clients';

export const POST = async () => {
  const tables = await db.$queryRaw<
    {
      tablename: string;
    }[]
  >`SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'`;
  await db.$executeRawUnsafe(
    `VACUUM ANALYZE ${tables.map(({ tablename }) => tablename).join(', ')}`,
  );

  return Response.json({ status: 0 });
};
