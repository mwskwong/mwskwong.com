if (process.env.VERCEL !== '1') {
  const { config } = await import('dotenv');
  config({ path: ['.env.development.local', '.env.local'] });
}

const { migrate } = await import('drizzle-orm/neon-http/migrator');
const { db } = await import('./clients');
await migrate(db, { migrationsFolder: '.drizzle' });
