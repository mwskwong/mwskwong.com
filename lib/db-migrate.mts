import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

if (process.env.VERCEL !== '1') {
  const { config } = await import('dotenv');
  config({ path: '.env.local' });
}

const sql = postgres(process.env.DATABASE_URL_UNPOOLED ?? '', { max: 1 });
const db = drizzle(sql);
await migrate(db, { migrationsFolder: '.drizzle' });
await sql.end();
