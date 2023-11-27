import { resolve } from 'node:path';

import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { FC } from 'react';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { BlogPosting, BreadcrumbList, Graph } from 'schema-dts';
import { IThemeRegistration, getHighlighter } from 'shiki';

import { Actions } from '@/components/blog/actions';
import { ContactMe } from '@/components/blog/contact-me';
import { CoverImage } from '@/components/blog/cover-image';
import { Heading } from '@/components/blog/heading';
import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { prisma } from '@/lib/clients';
import { getBlogBySlug, getBlogs } from '@/lib/queries';
import { getFileIcon } from '@/utils/get-file-icon';
import { getPerson } from '@/utils/json-ld';

// data attribute auto injected by rehype-pretty-code
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-language'?: string;
    'data-rehype-pretty-code-fragment'?: '';
    'data-rehype-pretty-code-title'?: '';
  }
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const shikiPath = resolve('.shiki');
const contactMeBgColor = 'primary.solidBg';

interface BlogProps {
  params: { slug: string };
}

const Blog: FC<BlogProps> = async ({ params: { slug } }) => {
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const metadata = await prisma.blogMetadata.findUnique({
    where: { id: blog.id },
  });
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
            {dateFormatter.format(new Date(blog.updatedAt))}
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
                div: (props) => {
                  const codeBlock =
                    props['data-rehype-pretty-code-fragment'] === '';
                  const codeTitle =
                    props['data-rehype-pretty-code-title'] === '';

                  if (codeBlock) {
                    const { color, ...rest } = props;
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Sheet
                        data-joy-color-scheme="dark"
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

                  if (codeTitle) {
                    const Icon =
                      typeof props.children === 'string' &&
                      getFileIcon(props.children.split('/').at(-1));
                    const { color, ...rest } = props;
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Typography
                        bgcolor="background.level1"
                        borderBottom={1}
                        borderColor="divider"
                        level="body-sm"
                        px={2}
                        py={1.5}
                        startDecorator={Icon ? <Icon /> : null}
                        textColor={color}
                        {...rest}
                      />
                    );
                  }

                  return <div {...props} />;
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
                  const inlineCode = props['data-language'] === undefined;

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

                  return (
                    // @ts-expect-error LegacyRef passed to RefObject
                    <Box
                      component="code"
                      sx={{
                        '& > [data-line]': { px: 2 },
                        '& > [data-highlighted-line]': {
                          bgcolor: 'primary.softBg',
                        },
                        '& [data-highlighted-chars]': {
                          bgcolor: 'primary.softBg',
                          // styles taken from <Typography variant="soft" />
                          borderRadius: 'xs',
                          py: 'min(0.1em, 4px)',
                          px: '0.25em',
                        },
                      }}
                      {...props}
                    />
                  );
                },
              }}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: 'dark-plus',
                        keepBackground: false,
                        getHighlighter: (options: {
                          theme: IThemeRegistration;
                        }) =>
                          getHighlighter({
                            ...options,
                            paths: {
                              languages: `${shikiPath}/languages`,
                              themes: `${shikiPath}/themes`,
                            },
                          }),
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
        <ContactMe bgcolor={contactMeBgColor} />
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
