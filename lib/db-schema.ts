import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const blogMetadata = pgTable('blog_metadata', {
  id: varchar('id').primaryKey(),
  view: integer('view').default(0),
});

export const contactFormSubmission = pgTable(
  'contact_form_submission',
  {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email'),
    subject: varchar('subject'),
    message: varchar('message').notNull(),
    showInGuestbook: boolean('show_in_guestbook').default(false),
    submittedAt: timestamp('submitted_at').defaultNow(),
  },
  ({ showInGuestbook, submittedAt }) => ({
    guestbookIdx: index().on(showInGuestbook, submittedAt),
  }),
);
