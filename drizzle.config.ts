import { Config } from 'drizzle-kit';

export default {
  schema: 'lib/db-schema.ts',
  out: '.drizzle',
  driver: 'pg',
  verbose: true,
  strict: true,
} satisfies Config;
