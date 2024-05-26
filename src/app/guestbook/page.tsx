import { Button, Container, Stack, Typography } from '@mui/joy';
import { escape } from 'lodash-es';
import { type Metadata, type ResolvingMetadata } from 'next';
import Link from 'next/link';
import { type FC, Suspense } from 'react';
import {
  type BreadcrumbList,
  type Comment,
  type DiscussionForumPosting,
  type Graph,
} from 'schema-dts';

import { ErrorBoundary } from '@/components/error-boundary';
import {
  SubmissionList,
  SubmissionListError,
  SubmissionListSkeleton,
} from '@/components/guestbook/submission-list';
import { SectionDivider } from '@/components/section-divider';
import { contactForm, guestbook, home } from '@/constants/nav';
import { env } from '@/env.mjs';
import { getPerson } from '@/lib/json-ld';
import { getGuestbookSubmissions } from '@/lib/queries';

const description =
  'Drop a line in my guestbook. Share your thoughts, stories, or a simple hello.';

const JsonLd: FC = async () => {
  const [comments, person] = await Promise.all([
    getGuestbookSubmissions(),
    getPerson(),
  ]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'DiscussionForumPosting',
              author: { '@id': person['@id'] },
              datePublished: new Date(2024, 0, 10).toISOString(),
              text: description,
              comment: comments.map(
                ({ name, submittedAt, message }) =>
                  ({
                    '@type': 'Comment',
                    author: { '@type': 'Person', name },
                    datePublished: submittedAt.toISOString(),
                    text: escape(message),
                  }) satisfies Comment,
              ),
              headline: `${env.NEXT_PUBLIC_SITE_DISPLAY_NAME} ${guestbook.label}`,
              interactionStatistic: {
                '@type': 'InteractionCounter',
                interactionType: { '@type': 'CommentAction' },
                userInteractionCount: comments.length,
              },
              url: env.NEXT_PUBLIC_SITE_URL + guestbook.pathname,
            } satisfies DiscussionForumPosting,
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  name: home.label,
                  item: env.NEXT_PUBLIC_SITE_URL,
                  position: 1,
                },
                {
                  '@type': 'ListItem',
                  name: guestbook.label,
                  position: 2,
                },
              ],
              name: 'Breadcrumbs',
            } satisfies BreadcrumbList,
            person,
          ],
        } satisfies Graph),
      }}
      type="application/ld+json"
    />
  );
};

const Guestbook: FC = () => (
  <>
    <Container
      component="main"
      maxWidth="md"
      sx={{ py: 'var(--Section-paddingY)' }}
    >
      <Stack spacing={8}>
        <Stack spacing={2} sx={{ textAlign: 'center' }}>
          <Typography level="h1">{guestbook.label}</Typography>
          <Typography>{description}</Typography>
        </Stack>
        <Button
          component={Link}
          size="lg"
          sx={{ alignSelf: { sm: 'center' } }}
          href={{
            pathname: contactForm.pathname,
            hash: contactForm.id,
            query: { showInGuestbook: true },
          }}
        >
          Leave A Message
        </Button>
        <ErrorBoundary fallback={<SubmissionListError />}>
          <Suspense fallback={<SubmissionListSkeleton />}>
            <SubmissionList />
          </Suspense>
        </ErrorBoundary>
      </Stack>
    </Container>
    <SectionDivider sx={{ bgcolor: 'var(--Footer-bg)' }} />
    <ErrorBoundary>
      <Suspense>
        <JsonLd />
      </Suspense>
    </ErrorBoundary>
  </>
);

export const generateMetadata = async (
  _: unknown,
  parent: ResolvingMetadata,
) => {
  const { openGraph } = await parent;

  return {
    title: guestbook.label,
    description,
    openGraph: { ...openGraph, url: guestbook.pathname },
    alternates: { canonical: guestbook.pathname },
  } satisfies Metadata;
};

export default Guestbook;
