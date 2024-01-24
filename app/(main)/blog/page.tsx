import {
  AspectRatio,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/joy';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { FC, Suspense } from 'react';
import { BreadcrumbList, WithContext } from 'schema-dts';

import { Views, ViewsSkeleton } from '@/components/blog/views';
import { Image } from '@/components/image';
import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { breakpoints } from '@/constants/mui-joy';
import { blog, blogRssFeed } from '@/constants/nav';
import { getBlogs } from '@/lib/queries';

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const description = 'Personal perspectives on a broad range of topics.';

const Blogs: FC = async () => {
  const blogs = await getBlogs({ page: 1 });
  const blogIds = blogs.map(({ id }) => id);
  const { sm, md, lg } = breakpoints.values;

  return (
    <>
      <Container component="main" sx={{ py: 'var(--Section-paddingY)' }}>
        <Stack spacing={8}>
          <Stack spacing={2} textAlign="center">
            <Typography level="h1">{blog.label}</Typography>
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
                      <AspectRatio
                        objectFit="cover"
                        ratio="1200/630"
                        variant="outlined"
                      >
                        <Image
                          alt={`Thumbnail for ${title}`}
                          fill
                          priority={index === 0}
                          sizes={[
                            `(min-width: ${lg}px) ${Math.round((4 / 12) * lg)}px`,
                            `(min-width: ${md}px) ${Math.round((4 / 12) * 100)}vw`,
                            `(min-width: ${sm}px) ${Math.round((6 / 12) * 100)}vw`,
                            '100vw',
                          ].join(',')}
                          src={coverPhoto}
                          sx={{ width: '100%', height: 'auto' }}
                        />
                      </AspectRatio>
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
                name: blog.label,
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

export const metadata = {
  title: blog.label,
  description,
  openGraph: { type: 'website', url: blog.pathname },
  alternates: {
    types: { 'application/rss+xml': `${baseUrl}${blogRssFeed.pathname}` },
  },
} satisfies Metadata;

export default Blogs;
