import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { FC, Suspense } from 'react';
import { BreadcrumbList, Graph } from 'schema-dts';

import { BlogCardImage } from '@/components/blog/blog-card-image';
import { Views, ViewsSkeleton } from '@/components/blog/views';
import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { blog } from '@/constants/nav';
import { getBlogs } from '@/lib/queries';
import { getJsonLdPerson } from '@/lib/utils';

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const description = 'Personal perspectives on a broad range of topics.';

const Blogs: FC = async () => {
  const [blogs, person] = await Promise.all([
    getBlogs({ page: 1 }),
    getJsonLdPerson(),
  ]);
  const blogIds = blogs.map(({ id }) => id);

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
                  coverPhoto,
                  slug,
                  title,
                  description,
                  categories,
                },
                index,
              ) => (
                <Grid key={id} md={4} sm={6} xs={12}>
                  <Card component="article" sx={{ height: { sm: '100%' } }}>
                    {coverPhoto ? (
                      <BlogCardImage
                        alt={`Thumbnail for ${title}`}
                        priority={index === 0}
                        src={coverPhoto}
                      />
                    ) : null}
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
                        href={`${blog.pathname}/${slug}`}
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
                          blogIds={blogIds}
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
  title: 'Blog',
  description,
  openGraph: { type: 'website', url: '/blog' },
} satisfies Metadata;

export default Blogs;
