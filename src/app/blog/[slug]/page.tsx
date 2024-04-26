import { SiRss } from '@icons-pack/react-simple-icons';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/joy';
import { type Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { type FC, Suspense } from 'react';
import { type BlogPosting, type BreadcrumbList, type Graph } from 'schema-dts';

import { BlogCoverImage } from '@/components/blog/blog-cover-image';
import { CopyUrlButton } from '@/components/blog/copy-url-button';
import { ShareDropdown } from '@/components/blog/share-dropdown';
import { Views, ViewsError, ViewsSkeleton } from '@/components/blog/views';
import { Icon } from '@/components/contentful';
import { ErrorBoundary } from '@/components/error-boundary';
import { Image } from '@/components/image';
import { Mdx } from '@/components/mdx';
import { SectionDivider } from '@/components/section-divider';
import { firstName, headline, lastName } from '@/constants/content';
import { blog as blogNav, blogRssFeed, home } from '@/constants/nav';
import { env } from '@/env.mjs';
import { getPerson } from '@/lib/json-ld';
import {
  getBlogBySlug,
  getBlogMetadataById,
  getBlogs,
  getPersonalPhoto,
  getPlatformProfiles,
} from '@/lib/queries';

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'full' });

const contactMeBgColor = 'primary.900';

interface BlogProps {
  params: { slug: string };
}

const Blog: FC<BlogProps> = async ({ params: { slug } }) => {
  const [blog, personalPhoto, platformProfiles, person] = await Promise.all([
    getBlogBySlug(slug),
    getPersonalPhoto(),
    getPlatformProfiles(),
    getPerson(),
  ]);
  if (!blog) notFound();

  const blogMetadataPromise = getBlogMetadataById(blog.id);

  return (
    <>
      <main>
        <Container
          component="article"
          maxWidth="md"
          sx={{ py: 'var(--Section-paddingY)' }}
        >
          <Typography level="body-sm">
            {dateFormatter.format(new Date(blog.createdAt))}
          </Typography>
          <Typography level="h1" sx={{ mb: 3, mt: 1 }}>
            {blog.title}
          </Typography>
          <Grid container spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
            <Grid sm xs={12}>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {blog.categories?.map((category) => (
                  <Chip key={category} color="primary">
                    {category}
                  </Chip>
                ))}
              </Stack>
            </Grid>
            <Grid sm="auto" xs={12}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', justifyContent: 'space-around' }}
              >
                <ErrorBoundary fallback={<ViewsError sx={{ mx: 0.75 }} />}>
                  <Suspense fallback={<ViewsSkeleton sx={{ mx: 0.75 }} />}>
                    <Views
                      blogMetadataPromise={blogMetadataPromise}
                      sx={{ mx: 0.75 }}
                    />
                  </Suspense>
                </ErrorBoundary>
                <CopyUrlButton />
                <ShareDropdown blog={blog} />
              </Stack>
            </Grid>
          </Grid>
          <BlogCoverImage
            priority
            alt={`Cover photo for ${blog.title}`}
            src={blog.coverPhoto}
          />
          {blog.content ? <Mdx source={blog.content} /> : null}
        </Container>
        <SectionDivider sx={{ bgcolor: contactMeBgColor }} />
        <Box
          component="section"
          data-joy-color-scheme="dark"
          sx={{ bgcolor: contactMeBgColor }}
        >
          <Container>
            <Stack
              spacing={8}
              sx={{ alignItems: { sm: 'center' }, textAlign: 'center' }}
            >
              <Typography level="h2">Written By</Typography>
              <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <Image
                  alt={`${firstName} ${lastName}`}
                  height={100}
                  src={personalPhoto}
                  width={100}
                  sx={{
                    borderRadius: '50%',
                    border: 1,
                    borderColor: 'neutral.outlinedBorder',
                  }}
                />
                <div>
                  <Typography level="title-lg">
                    {firstName} {lastName}
                  </Typography>
                  <Typography>{headline}</Typography>
                </div>
                <Stack direction="row" spacing={1}>
                  {platformProfiles.map(
                    ({ platform, url }) =>
                      platform && (
                        <IconButton
                          key={platform.id}
                          aria-label={`${platform.name} profile`}
                          component="a"
                          href={url}
                          size="sm"
                          target="_blank"
                        >
                          <Icon contentfulId={platform.id} />
                        </IconButton>
                      ),
                  )}
                  <IconButton
                    aria-label="RSS Feed"
                    component="a"
                    href={blogRssFeed.pathname}
                    size="sm"
                    target="_blank"
                  >
                    <SiRss viewBox="-2 -2 28 28" />
                  </IconButton>
                </Stack>
              </Stack>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ justifyContent: 'center' }}
              >
                <Button component={NextLink} href={home.pathname} size="lg">
                  More About Me
                </Button>
                <Button
                  color="neutral"
                  component={NextLink}
                  href={blogNav.pathname}
                  size="lg"
                  variant="outlined"
                >
                  More Articles
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </main>
      <SectionDivider
        sx={{ color: contactMeBgColor, bgcolor: 'var(--Footer-bg)' }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BlogPosting',
                headline: blog.title,
                description: blog.description,
                image: blog.coverPhoto,
                datePublished: blog.createdAt,
                dateModified: blog.updatedAt,
                url: `${env.NEXT_PUBLIC_SITE_URL}${blogNav.pathname}/${slug}`,
                author: { '@id': person['@id'] },
                keywords: blog.categories,
              } satisfies BlogPosting,
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
                    name: blogNav.label,
                    item: env.NEXT_PUBLIC_SITE_URL + blogNav.pathname,
                    position: 2,
                  },
                  {
                    '@type': 'ListItem',
                    name: blog.title,
                    position: 3,
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

export const generateStaticParams = () =>
  getBlogs().then((blogs) =>
    blogs.map(({ slug }) => ({ slug })),
  ) satisfies Promise<BlogProps['params'][]>;

export const generateMetadata = async ({ params: { slug } }: BlogProps) => {
  const blog = await getBlogBySlug(slug);
  if (!blog) return;

  const { title, description, coverPhoto, createdAt, updatedAt, categories } =
    blog;

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      authors: env.NEXT_PUBLIC_SITE_URL,
      publishedTime: createdAt,
      modifiedTime: updatedAt,
      tags: categories,
      url: `${blogNav.pathname}/${slug}`,
      images: coverPhoto,
    },
    alternates: {
      canonical: `${blogNav.pathname}/${slug}`,
      types: { 'application/rss+xml': blogRssFeed.pathname },
    },
  } satisfies Metadata;
};

export default Blog;
