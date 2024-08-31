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
import { IncrBlogView } from '@/components/blog/incr-blog-view';
import { ShareDropdown } from '@/components/blog/share-dropdown';
import { Views, ViewsError, ViewsSkeleton } from '@/components/blog/views';
import { Icon } from '@/components/contentful';
import { ErrorBoundary } from '@/components/error-boundary';
import { Image } from '@/components/image';
import { Mdx } from '@/components/mdx';
import { SectionDivider } from '@/components/section-divider';
import { firstName, headline, lastName } from '@/constants/content';
import { routes, siteUrl } from '@/constants/site-config';
import { getPerson } from '@/lib/json-ld';
import {
  getBlogBySlug,
  getBlogs,
  getPersonalPhoto,
  getSocialMediaProfiles,
} from '@/lib/queries';

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'full' });

const contactMeBgColor = 'primary.900';

interface BlogProps {
  params: { slug: string };
}

const Blog: FC<BlogProps> = async ({ params: { slug } }) => {
  const [blog, personalPhoto, socialMediaProfiles, person] = await Promise.all([
    getBlogBySlug(slug),
    getPersonalPhoto(),
    getSocialMediaProfiles(),
    getPerson(),
  ]);
  if (!blog) notFound();

  return (
    <>
      <IncrBlogView blogId={blog.id} />
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
            <Grid size={{ sm: 'grow', xs: 12 }}>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {blog.categories?.map((category) => (
                  <Chip key={category} color="primary">
                    {category}
                  </Chip>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ sm: 'auto', xs: 12 }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', justifyContent: 'space-around' }}
              >
                <ErrorBoundary fallback={<ViewsError sx={{ mx: 0.75 }} />}>
                  <Suspense fallback={<ViewsSkeleton sx={{ mx: 0.75 }} />}>
                    <Views blogId={blog.id} sx={{ mx: 0.75 }} />
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
                  {socialMediaProfiles.map(
                    ({ socialMedia, url }) =>
                      socialMedia && (
                        <IconButton
                          key={socialMedia.id}
                          aria-label={`${socialMedia.name} profile`}
                          component="a"
                          href={url}
                          size="sm"
                          target="_blank"
                        >
                          <Icon contentfulId={socialMedia.id} />
                        </IconButton>
                      ),
                  )}
                  <IconButton
                    aria-label={routes.blogRssFeed.name}
                    component="a"
                    href={routes.blogRssFeed.pathname}
                    size="sm"
                    target="_blank"
                  >
                    <SiRss className="si" />
                  </IconButton>
                </Stack>
              </Stack>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ justifyContent: 'center' }}
              >
                <Button component={NextLink} href={routes.home} size="lg">
                  More About Me
                </Button>
                <Button
                  color="neutral"
                  component={NextLink}
                  href={routes.blog}
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
                url: `${siteUrl}${routes.blog.pathname}/${slug}`,
                author: { '@id': person['@id'] },
                keywords: blog.categories,
              } satisfies BlogPosting,
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
                    name: routes.blog.name,
                    item: siteUrl + routes.blog.pathname,
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
      authors: siteUrl,
      publishedTime: createdAt,
      modifiedTime: updatedAt,
      tags: categories,
      url: `${routes.blog.pathname}/${slug}`,
      images: coverPhoto,
    },
    alternates: {
      canonical: `${routes.blog.pathname}/${slug}`,
      types: { 'application/rss+xml': routes.blogRssFeed.pathname },
    },
  } satisfies Metadata;
};

export default Blog;
