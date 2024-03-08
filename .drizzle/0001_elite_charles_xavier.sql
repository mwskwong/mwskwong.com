ALTER TABLE "blog_metadata" ALTER COLUMN "view" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_form_submission" ALTER COLUMN "show_in_guestbook" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_form_submission" ALTER COLUMN "submitted_at" SET NOT NULL;