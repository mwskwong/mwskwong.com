import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/joy';
import { type Metadata, type ResolvingMetadata } from 'next';
import NextLink from 'next/link';
import { type FC, Suspense } from 'react';
import { type BreadcrumbList, type WithContext } from 'schema-dts';

import { BlogCardImage } from '@/components/blog/blog-card-image';
import { Views, ViewsError, ViewsSkeleton } from '@/components/blog/views';
import { ErrorBoundary } from '@/components/error-boundary';
import { SectionDivider } from '@/components/section-divider';
import { routes, siteUrl } from '@/constants/site-config';
import { getBlogs } from '@/lib/queries';

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

const description = 'Personal perspectives on a broad range of topics.';

const Blogs: FC = async () => {
  const blogs = await getBlogs();

  return (
    <>
      <Container component="main" sx={{ py: 'var(--Section-paddingY)' }}>
        <Stack spacing={8}>
          <Stack spacing={2} sx={{ textAlign: 'center' }}>
            <Typography level="h1">{routes.blog.name}</Typography>
            <Typography>{description}</Typography>
          </Stack>

          <Grid container spacing={2}>
            {blogs.map(
              (
                { id, createdAt, coverPhoto, slug, title, description },
                index,
              ) => (
                <Grid key={id} size={{ md: 4, sm: 6, xs: 12 }}>
                  <Card component="article" sx={{ height: { sm: '100%' } }}>
                    <BlogCardImage
                      alt={`Thumbnail for ${title}`}
                      priority={index === 0}
                      src={coverPhoto}
                    />
                    <CardContent>
                      <Link
                        overlay
                        color="neutral"
                        component={NextLink}
                        href={`${routes.blog.pathname}/${slug}`}
                        level="title-lg"
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          color: 'text.primary',
                        }}
                      >
                        {title}
                      </Link>
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {description}
                      </Typography>
                    </CardContent>
                    <CardContent orientation="horizontal" sx={{ flex: 0 }}>
                      <Typography level="body-sm">
                        {dateFormatter.format(new Date(createdAt))}
                      </Typography>
                      <Divider orientation="vertical" />
                      <ErrorBoundary
                        fallback={<ViewsError hideIcon level="body-sm" />}
                      >
                        <Suspense
                          fallback={<ViewsSkeleton hideIcon level="body-sm" />}
                        >
                          <Views batch hideIcon blogId={id} level="body-sm" />
                        </Suspense>
                      </ErrorBoundary>
                    </CardContent>
                  </Card>
                </Grid>
              ),
            )}
          </Grid>
        </Stack>
      </Container>
      <SectionDivider sx={{ bgcolor: 'var(--Footer-bg)' }} />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
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
                name: routes.blog.name,
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
  _: unknown,
  parent: ResolvingMetadata,
) => {
  const { openGraph } = await parent;

  return {
    title: routes.blog.name,
    description,
    openGraph: { ...openGraph, url: routes.blog.pathname },
    alternates: {
      canonical: routes.blog.pathname,
      types: { 'application/rss+xml': routes.blogRssFeed.pathname },
    },
  } satisfies Metadata;
};

export default Blogs;
