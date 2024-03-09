-- CreateTable
CREATE TABLE "blog_metadata" (
    "id" TEXT NOT NULL,
    "view" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "blog_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_form_submission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "show_in_guestbook" BOOLEAN NOT NULL DEFAULT false,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_form_submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_form_submission_show_in_guestbook_submitted_at_idx" ON "contact_form_submission"("show_in_guestbook" DESC, "submitted_at" DESC);
