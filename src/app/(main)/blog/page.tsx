import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Metadata, ResolvingMetadata } from 'next';
import NextLink from 'next/link';
import { FC, Suspense } from 'react';
import { BreadcrumbList, Graph } from 'schema-dts';

import { BlogCardImage } from '@/components/blog/blog-card-image';
import { Likes, LikesSkeleton } from '@/components/blog/likes';
import { Views, ViewsSkeleton } from '@/components/blog/views';
import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { getBlogs } from '@/lib/queries';
import { getPerson } from '@/utils/json-ld';

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const description = 'Personal perspectives on a broad range of topics.';

const Blogs: FC = async () => {
  const [blogs, person] = await Promise.all([
    getBlogs({ page: 1 }),
    getPerson(),
  ]);

  return (
    <>
      <Container component="main" sx={{ py: 'var(--Section-paddingY)' }}>
        <Stack spacing={8}>
          <Stack spacing={2} textAlign="center">
            <Typography level="h1">Blog</Typography>
            <Typography>{description}</Typography>
          </Stack>
          <Grid container spacing={2}>
            {blogs.map(
              (
                {
                  id,
                  createdAt,
                  coverPhoto = '',
                  slug,
                  title,
                  description,
                  categories,
                },
                index,
              ) => (
                <Grid key={id} md={4} sm={6} xs={12}>
                  <Card component="article" sx={{ height: { sm: '100%' } }}>
                    <BlogCardImage priority={index === 0} src={coverPhoto} />
                    <Stack direction="row" flexWrap="wrap" spacing={1}>
                      {categories?.map((category) => (
                        <Chip color="primary" key={category}>
                          {category}
                        </Chip>
                      ))}
                    </Stack>
                    <CardContent>
                      <Link
                        color="neutral"
                        component={NextLink}
                        display="-webkit-box"
                        href={`/blog/${slug}`}
                        overflow="hidden"
                        overlay
                        sx={{ WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                        typography="title-lg"
                      >
                        {title}
                      </Link>
                      <Typography
                        display="-webkit-box"
                        overflow="hidden"
                        sx={{ WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
                      >
                        {description}
                      </Typography>
                    </CardContent>
                    <CardContent orientation="horizontal" sx={{ flex: 0 }}>
                      <Typography level="body-sm">
                        {dateFormatter.format(new Date(createdAt))}
                      </Typography>
                      <Divider orientation="vertical" />
                      <Suspense fallback={<ViewsSkeleton level="body-sm" />}>
                        <Views
                          blogId={id}
                          blogIds={blogs.map(({ id }) => id)}
                          level="body-sm"
                          readOnly
                        />
                      </Suspense>
                      <Divider orientation="vertical" />
                      <Suspense fallback={<LikesSkeleton level="body-sm" />}>
                        <Likes
                          blogId={id}
                          blogIds={blogs.map(({ id }) => id)}
                          level="body-sm"
                          readOnly
                        />
                      </Suspense>
                    </CardContent>
                  </Card>
                </Grid>
              ),
            )}
          </Grid>
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
                    name: 'Blog',
                    item: `${baseUrl}/blog`,
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

export const generateMetadata = async (
  _: object,
  parent: ResolvingMetadata,
) => {
  const title = 'Blog';
  const path = '/blog';
  const { openGraph } = await parent;

  return {
    title,
    description,
    openGraph: { ...openGraph, url: path },
  } satisfies Metadata;
};

export default Blogs;
