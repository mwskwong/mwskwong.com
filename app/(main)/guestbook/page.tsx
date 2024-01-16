import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { BreadcrumbList, Graph } from 'schema-dts';

import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { contactForm } from '@/constants/nav';
import { getGuestbookSubmissions } from '@/lib/queries';
import { getJsonLdPerson } from '@/lib/utils';

extend(relativeTime);

const description =
  'Drop a line in my guestbook. Share your thoughts, stories, or a simple hello.';

const Guestbook: FC = async () => {
  const [submissions, person] = await Promise.all([
    getGuestbookSubmissions(),
    getJsonLdPerson(),
  ]);

  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        sx={{ py: 'var(--Section-paddingY)' }}
      >
        <Stack spacing={8}>
          <Stack spacing={2} textAlign="center">
            <Typography level="h1">Guestbook</Typography>
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
          <List
            sx={{
              '--List-gap': '16px',
              '--ListItemDecorator-size': '48px',
              '& > li': { alignItems: 'flex-start' },
            }}
          >
            {submissions.map(({ id, name, message, submittedAt }) => (
              <ListItem key={id}>
                <ListItemDecorator>
                  <Avatar size="sm" sx={{ textTransform: 'uppercase' }}>
                    {name
                      .split(' ')
                      .slice(0, 2)
                      .map((text) => text[0])
                      .join('')}
                  </Avatar>
                </ListItemDecorator>
                <ListItemContent>
                  <Typography level="title-md">
                    {name}
                    <Typography level="body-sm">
                      {' · '}
                      {dayjs(submittedAt).fromNow()}
                    </Typography>
                  </Typography>
                  <Typography
                    component="pre"
                    level="body-md"
                    whiteSpace="pre-wrap"
                  >
                    {message}
                  </Typography>
                </ListItemContent>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Container>
      <SectionDivider bgcolor="var(--Footer-bg)" />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    name: 'Home',
                    item: baseUrl,
                    position: 1,
                  },
                  {
                    '@type': 'ListItem',
                    name: 'Guestbook',
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
    </>
  );
};

export const metadata = {
  title: 'Guestbook',
  description,
  openGraph: { type: 'website', url: '/guestbook' },
} satisfies Metadata;

export default Guestbook;
