import { SiRss } from '@icons-pack/react-simple-icons';
import {
  AspectRatio,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/joy';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { FC, Suspense } from 'react';
import { BlogPosting, BreadcrumbList, Graph } from 'schema-dts';

import { CopyUrlButton } from '@/components/blog/copy-url-button';
import { Likes, LikesSkeleton } from '@/components/blog/likes';
import { ShareDropdown } from '@/components/blog/share-dropdown';
import { Views, ViewsSkeleton } from '@/components/blog/views';
import { Icon } from '@/components/contentful';
import { Image } from '@/components/image';
import { Mdx } from '@/components/mdx';
import { SectionDivider } from '@/components/section-divider';
import { firstName, headline, lastName } from '@/constants/content';
import { breakpoints } from '@/constants/mui-joy';
import { blog as blogPage, blogRssFeed, home } from '@/constants/nav';
import { baseUrl } from '@/constants/site-config';
import {
  getBlogBySlug,
  getBlogs,
  getPersonalPhoto,
  getPlatformProfiles,
} from '@/lib/queries';
import { getJsonLdPerson } from '@/lib/utils';

// data attribute auto injected by rehype-pretty-code
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-language'?: string;
    'data-rehype-pretty-code-figure'?: '';
    'data-rehype-pretty-code-title'?: '';
    'data-highlighted-chars'?: '';
  }
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const contactMeBgColor = 'primary.900';

interface BlogProps {
  params: { slug: string };
}

const Blog: FC<BlogProps> = async ({ params: { slug } }) => {
  const [blog, personalPhoto, platformProfiles, person] = await Promise.all([
    getBlogBySlug(slug),
    getPersonalPhoto(),
    getPlatformProfiles(),
    getJsonLdPerson(),
  ]);
  if (!blog) notFound();
  const { md } = breakpoints.values;

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
          <Typography level="h1" mb={3} mt={1}>
            {blog.title}
          </Typography>
          <Grid alignItems="center" container mb={2} spacing={2}>
            <Grid sm xs={12}>
              <Stack direction="row" flexWrap="wrap" spacing={1}>
                {blog.categories?.map((category) => (
                  <Chip color="primary" key={category}>
                    {category}
                  </Chip>
                ))}
              </Stack>
            </Grid>
            <Grid sm="auto" xs={12}>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-around"
                spacing={1}
              >
                <Suspense fallback={<ViewsSkeleton mr={0.75} />}>
                  <Views blogId={blog.id} mr={0.75} />
                </Suspense>
                <Suspense fallback={<LikesSkeleton mr={0.75} />}>
                  <Likes blogId={blog.id} mr={0.75} />
                </Suspense>
                <CopyUrlButton />
                <ShareDropdown blog={blog} />
              </Stack>
            </Grid>
          </Grid>
          {blog.coverPhoto ? (
            <AspectRatio
              objectFit="cover"
              ratio="1200/630"
              sx={{ borderRadius: 'md' }}
              variant="outlined"
            >
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt -- cover photo is a valid word */}
              <Image
                alt={`Cover photo for ${blog.title}`}
                fill
                priority
                sizes={[`(min-width: ${md}px) ${md}px`, '100vw'].join(',')}
                src={blog.coverPhoto}
                sx={{ width: '100%', height: 'auto' }}
              />
            </AspectRatio>
          ) : null}
          {blog.content ? <Mdx source={blog.content} /> : null}
        </Container>
        <SectionDivider bgcolor={contactMeBgColor} />
        <Box
          bgcolor={contactMeBgColor}
          component="section"
          data-joy-color-scheme="dark"
        >
          <Container>
            <Stack alignItems={{ sm: 'center' }} spacing={8} textAlign="center">
              <Typography level="h2">Written By</Typography>
              <Stack alignItems="center" spacing={2}>
                {personalPhoto ? (
                  <Image
                    alt={`${firstName} ${lastName}`}
                    height={48}
                    src={personalPhoto}
                    sx={{ borderRadius: '50%', bgcolor: 'neutral.softBg' }}
                    width={48}
                  />
                ) : null}
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
                          aria-label={`${platform.name} profile`}
                          component="a"
                          href={url}
                          key={platform.id}
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
                justifyContent="center"
                spacing={2}
              >
                <Button component={NextLink} href={home.pathname} size="lg">
                  More About Me
                </Button>
                <Button
                  color="neutral"
                  component={NextLink}
                  href={blogPage.pathname}
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
      <SectionDivider bgcolor="var(--Footer-bg)" color={contactMeBgColor} />
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
                url: `${baseUrl}/blog/${slug}`,
                author: { '@id': person['@id'] },
                keywords: blog.categories,
              } satisfies BlogPosting,
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
                    name: blogPage.label,
                    item: `${baseUrl}/blog`,
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
      authors: baseUrl,
      publishedTime: createdAt,
      modifiedTime: updatedAt,
      tags: categories,
      url: `${blogPage.pathname}/${slug}`,
      images: coverPhoto,
    },
    alternates: {
      canonical: `${blogPage.pathname}/${slug}`,
      types: { 'application/rss+xml': `${baseUrl}${blogRssFeed.pathname}` },
    },
  } satisfies Metadata;
};

export default Blog;
