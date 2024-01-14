import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { FC, Suspense } from 'react';
import { BlogPosting, BreadcrumbList, Graph } from 'schema-dts';

import { CopyUrlButton } from '@/components/blog/copy-url-button';
import { CoverImage } from '@/components/blog/cover-image';
import { ShareDropdown } from '@/components/blog/share-dropdown';
import { Views, ViewsSkeleton } from '@/components/blog/views';
import { Icon } from '@/components/contentful';
import { Image } from '@/components/image';
import { Mdx } from '@/components/mdx';
import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { firstName, headline, lastName } from '@/constants/content';
import { blog as blogPage, home } from '@/constants/nav';
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
                <CopyUrlButton />
                <ShareDropdown blog={blog} />
              </Stack>
            </Grid>
          </Grid>
          {blog.coverPhoto ? <CoverImage src={blog.coverPhoto} /> : null}
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
              <Typography level="h2">About The Author</Typography>
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
                        <Tooltip
                          key={platform.id}
                          title={`${platform.name} profile`}
                        >
                          <IconButton
                            component="a"
                            href={url}
                            size="sm"
                            target="_blank"
                          >
                            <Icon contentfulId={platform.id} />
                          </IconButton>
                        </Tooltip>
                      ),
                  )}
                </Stack>
              </Stack>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="center"
                spacing={2}
              >
                <Button
                  component={NextLink}
                  endDecorator={<ArrowRight />}
                  href={home.pathname}
                  size="lg"
                >
                  Learn More
                </Button>
                <Button
                  color="neutral"
                  component={NextLink}
                  href={blogPage.pathname}
                  size="lg"
                  variant="outlined"
                >
                  My Other Articles
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
                    name: 'Blog',
                    item: `${baseUrl}/blog`,
                    position: 2,
                  },
                  {
                    '@type': 'ListItem',
                    name: blog.title,
                    item: `${baseUrl}/blog/${blog.slug}`,
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
      url: `/blog/${slug}`,
      images: `https:${coverPhoto}`,
    },
  } satisfies Metadata;
};

export default Blog;
