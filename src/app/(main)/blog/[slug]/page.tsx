import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { FC } from 'react';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { BlogPosting, BreadcrumbList, Graph } from 'schema-dts';

import { Actions } from '@/components/blog/actions';
import { CoverImage } from '@/components/blog/cover-image';
import { Heading } from '@/components/blog/heading';
import { ColorInversionBox } from '@/components/color-inversion-box';
import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { contact } from '@/constants/nav';
import { getBlogBySlug, getBlogMetadataById, getBlogs } from '@/lib/queries';
import { getPerson } from '@/utils/json-ld';

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

const contactMeBgColor = 'primary.solidBg';

interface BlogProps {
  params: { slug: string };
}

const Blog: FC<BlogProps> = async ({ params: { slug } }) => {
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const metadata = await getBlogMetadataById(blog.id);
  const person = await getPerson();

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
              <Actions blog={blog} {...metadata} />
            </Grid>
          </Grid>
          {blog.coverPhoto ? <CoverImage src={blog.coverPhoto} /> : null}
          {blog.content ? (
            <MDXRemote
              components={{
                h2: ({ color, ...props }) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <Heading
                    level="h2"
                    mb={3}
                    mt={6}
                    sx={{
                      scrollMarginTop: 'calc(var(--Header-offset) + 8px * 6)',
                    }}
                    textColor={color}
                    {...props}
                  />
                ),
                h3: ({ color, ...props }) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <Heading
                    level="h3"
                    mb={1.5}
                    mt={4}
                    sx={{
                      scrollMarginTop: 'calc(var(--Header-offset) + 8px * 4)',
                    }}
                    textColor={color}
                    {...props}
                  />
                ),
                h4: ({ color, ...props }) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <Heading
                    level="h4"
                    mb={1}
                    mt={3}
                    sx={{
                      scrollMarginTop: 'calc(var(--Header-offset) + 8px * 3)',
                    }}
                    textColor={color}
                    {...props}
                  />
                ),
                p: ({ color, ...props }) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <Typography my={2} textColor={color} {...props} />
                ),
                a: ({ color, ...props }) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  // eslint-disable-next-line jsx-a11y/anchor-has-content -- whether the anchor has content is depending on the MD itself
                  <Link
                    sx={{ '& > code': { color: 'inherit' } }}
                    target="_blank"
                    textColor={color}
                    underline="always"
                    {...props}
                  />
                ),
                ul: ({ color, ...props }) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <List
                    component="ul"
                    marker="disc"
                    sx={{ color, my: 2, '--List-padding': '0px' }}
                    {...props}
                  />
                ),
                ol: ({ color, ...props }) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <List
                    component="ol"
                    marker="decimal"
                    sx={{ color, my: 2, '--List-padding': '0px' }}
                    {...props}
                  />
                ),
                li: ({ color, ...props }) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <ListItem
                    sx={{
                      color,
                      // handle <p>, which has margin by default, nested in <li>
                      '& :first-child': { mt: 0 },
                      '& :last-child': { mb: 0 },
                      '& > code': { display: 'inline', mx: 0 },
                    }}
                    {...props}
                  />
                ),
                figure: (props) => {
                  if (props['data-rehype-pretty-code-figure'] === '') {
                    const { color, ...rest } = props;
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Sheet
                        component="figure"
                        sx={{
                          color,
                          borderRadius: 'md',
                          my: 2,
                          overflow: 'hidden',
                        }}
                        variant="outlined"
                        {...rest}
                      />
                    );
                  }
                  return <figure {...props} />;
                },
                figcaption: (props) => {
                  if (props['data-rehype-pretty-code-title'] === '') {
                    const { color, ...rest } = props;
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Typography
                        component="figcaption"
                        level="body-sm"
                        pt={2}
                        textAlign="center"
                        textColor={color}
                        {...rest}
                      />
                    );
                  }
                  return <figcaption {...props} />;
                },
                pre: (props) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <Box
                    component="pre"
                    m={0}
                    overflow="auto"
                    py={2}
                    {...props}
                  />
                ),
                code: (props) => {
                  const inlineCode = props.style === undefined;

                  if (inlineCode) {
                    const { color, ...rest } = props;
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Typography
                        component="code"
                        fontFamily="code"
                        fontSize="0.875em"
                        textColor={color}
                        variant="soft"
                        {...rest}
                      />
                    );
                  }

                  return <code {...props} />;
                },
                span: (props) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <Box
                    component="span"
                    sx={{
                      'code[style] &': {
                        '&[data-line]': { px: 2 },
                        '&[data-highlighted-line]': {
                          bgcolor: 'primary.softBg',
                        },
                      },
                    }}
                    {...props}
                  />
                ),
                mark: (props) => {
                  if (props['data-highlighted-chars'] === '') {
                    const { color, ...rest } = props;
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Typography
                        component="mark"
                        textColor={color}
                        variant="soft"
                        {...rest}
                      />
                    );
                  }

                  return <mark {...props} />;
                },
              }}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [
                      // @ts-expect-error this plugin is depending on unified v11 while next-mdx-remote is depending on mdx v2 --> unified v10
                      rehypePrettyCode,
                      {
                        theme: {
                          dark: 'dark-plus',
                          light: 'light-plus',
                        },
                        keepBackground: false,
                        defaultLang: { block: 'ansi' },
                      } satisfies Options,
                    ],
                    rehypeSlug,
                  ],
                },
              }}
              source={blog.content}
            />
          ) : null}
        </Container>
        <SectionDivider bgcolor={contactMeBgColor} />
        <ColorInversionBox
          bgcolor={contactMeBgColor}
          color="primary"
          component="section"
          variant="solid"
        >
          <Container
            sx={{
              '& ::selection': {
                bgcolor: 'var(--variant-solidBg)',
                color: 'var(--variant-solidColor)',
              },
            }}
          >
            <Stack alignItems={{ sm: 'center' }} spacing={8} textAlign="center">
              <Typography level="h2">Any Questions or Comments?</Typography>
              <Button
                component={NextLink}
                endDecorator={<ArrowRight />}
                href={contact.href}
                size="lg"
              >
                Contact Me
              </Button>
            </Stack>
          </Container>
        </ColorInversionBox>
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
      images: coverPhoto,
    },
  } satisfies Metadata;
};

export default Blog;
