CREATE TABLE IF NOT EXISTS "blog_metadata" (
	"id" varchar PRIMARY KEY NOT NULL,
	"view" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact_form_submission" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar,
	"subject" varchar,
	"message" varchar NOT NULL,
	"show_in_guestbook" boolean DEFAULT false,
	"submitted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "contact_form_submission_show_in_guestbook_submitted_at_index" ON "contact_form_submission" ("show_in_guestbook","submitted_at");