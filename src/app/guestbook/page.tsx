import { Button, Container, Stack, Typography } from '@mui/joy';
import { escape } from 'lodash-es';
import { type Metadata, type ResolvingMetadata } from 'next';
import Link from 'next/link';
import { type FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  type BreadcrumbList,
  type Comment,
  type DiscussionForumPosting,
  type Graph,
} from 'schema-dts';

import {
  SubmissionList,
  SubmissionListError,
  SubmissionListSkeleton,
} from '@/components/guestbook/submission-list';
import { SectionDivider } from '@/components/section-divider';
import { routes, siteDisplayName, siteUrl } from '@/constants/site-config';
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
              headline: `${siteDisplayName} ${routes.guestbook.name}`,
              interactionStatistic: {
                '@type': 'InteractionCounter',
                interactionType: { '@type': 'CommentAction' },
                userInteractionCount: comments.length,
              },
              url: siteUrl + routes.guestbook.pathname,
            } satisfies DiscussionForumPosting,
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  name: routes.home.name,
                  item: siteUrl,
                  position: 1,
                },
                {
                  '@type': 'ListItem',
                  name: routes.guestbook.name,
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
          <Typography level="h1">{routes.guestbook.name}</Typography>
          <Typography>{description}</Typography>
        </Stack>
        <ErrorBoundary fallback={<SubmissionListError />}>
          <Suspense fallback={<SubmissionListSkeleton />}>
            <SubmissionList />
          </Suspense>
        </ErrorBoundary>
        <Button
          component={Link}
          href={{ ...routes.contactForm, query: { showInGuestbook: true } }}
          size="lg"
          sx={{ alignSelf: { sm: 'center' } }}
        >
          Leave A Message
        </Button>
      </Stack>
    </Container>
    <SectionDivider sx={{ bgcolor: 'var(--Footer-bg)' }} />
    <ErrorBoundary fallback={null}>
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
    title: routes.guestbook.name,
    description,
    openGraph: { ...openGraph, url: routes.guestbook.pathname },
    alternates: { canonical: routes.guestbook.pathname },
  } satisfies Metadata;
};

export default Guestbook;
