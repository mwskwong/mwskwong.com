import { Button, Container, Stack, Typography } from '@mui/joy';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC, Suspense } from 'react';

import {
  SubmissionList,
  SubmissionListSkeleton,
} from '@/components/guestbook/submission-list';
import { SectionDivider } from '@/components/section-divider';
import { contactForm, guestbook } from '@/constants/nav';

import { JsonLd } from './json-ld';

const description =
  'Drop a line in my guestbook. Share your thoughts, stories, or a simple hello.';

const Guestbook: FC = () => (
  <>
    <Container
      component="main"
      maxWidth="md"
      sx={{ py: 'var(--Section-paddingY)' }}
    >
      <Stack spacing={8}>
        <Stack spacing={2} textAlign="center">
          <Typography level="h1">{guestbook.label}</Typography>
          <Typography>{description}</Typography>
        </Stack>
        <Button
          component={Link}
          href={{
            pathname: contactForm.pathname,
            hash: contactForm.id,
            query: { showInGuestbook: true },
          }}
          size="lg"
          sx={{ alignSelf: { sm: 'center' } }}
        >
          Leave A Message
        </Button>
        <Suspense fallback={<SubmissionListSkeleton />}>
          <SubmissionList />
        </Suspense>
      </Stack>
    </Container>
    <SectionDivider bgcolor="var(--Footer-bg)" />
    <Suspense>
      <JsonLd
        discussionForumPosting={{
          text: description,
          headline: guestbook.label,
        }}
      />
    </Suspense>
  </>
);

export const metadata = {
  title: guestbook.label,
  description,
  openGraph: { type: 'website', url: guestbook.pathname },
} satisfies Metadata;

export default Guestbook;
