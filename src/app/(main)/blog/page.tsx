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
import { BreadcrumbList, WithContext } from 'schema-dts';

import { BlogCardImage } from '@/components/blog/blog-card-image';
import { ViewCount, ViewCountSkeleton } from '@/components/blog/view-count';
import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { getBlogs } from '@/lib/queries';

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const Blogs: FC = async () => {
  const blogs = await getBlogs({ page: 1 });

  return (
    <>
      <Container component="main" sx={{ py: 'var(--Section-paddingY)' }}>
        <Stack spacing={8}>
          <Stack spacing={2} textAlign="center">
            <Typography level="h1">Blog</Typography>
            <Typography>
              Personal perspectives on a broad range of topics.
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            {blogs.map(
              (
                {
                  id,
                  updatedAt,
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
                        {dateFormatter.format(new Date(updatedAt))}
                      </Typography>
                      <Divider orientation="vertical" />
                      <Suspense
                        fallback={<ViewCountSkeleton level="body-sm" />}
                      >
                        <ViewCount blogId={id} level="body-sm" />
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
          } satisfies WithContext<BreadcrumbList>),
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
    description: 'Personal perspectives on a broad range of topics.',
    openGraph: { ...openGraph, url: path },
  } satisfies Metadata;
};

export default Blogs;
