import { migrate } from 'drizzle-orm/neon-http/migrator';

import { db } from './clients';

void migrate(db, { migrationsFolder: 'drizzle' });
