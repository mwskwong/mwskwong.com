-- DropIndex
DROP INDEX "contact_form_submission_show_in_guestbook_submitted_at_idx";

-- CreateIndex
CREATE INDEX "contact_form_submission_show_in_guestbook_submitted_at_idx" ON "contact_form_submission"("show_in_guestbook" DESC, "submitted_at" ASC);
