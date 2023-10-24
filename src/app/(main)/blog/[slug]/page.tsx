import { resolve } from 'node:path';

import {
  Box,
  Chip,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { FC, Suspense } from 'react';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { IThemeRegistration, getHighlighter } from 'shiki';

import { Actions } from '@/components/blog/actions';
import { ContactMe } from '@/components/blog/contact-me';
import { CoverImage } from '@/components/blog/cover-image';
import { Heading } from '@/components/blog/heading';
import { ViewCount } from '@/components/blog/view-count';
import { SectionDivider } from '@/components/section-divider';
import { firstName, lastName } from '@/constants/content';
import { getBlogBySlug } from '@/lib/get-blog-by-slug';
import { getBlogs } from '@/lib/get-blogs';
import { getIconByProgrammingLanguage } from '@/utils/get-icon-by-programming-language';

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

  return (
    <>
      <main>
        <Container
          component="article"
          maxWidth="md"
          sx={{ py: 'var(--Section-paddingY)' }}
        >
          <Typography level="body-xs">
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
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-around"
                spacing={1}
              >
                <Suspense>
                  <ViewCount blogId={blog.id} />
                </Suspense>
                <Actions blog={blog} />
              </Stack>
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
                    const language = props['data-language'];
                    const Icon =
                      language && getIconByProgrammingLanguage(language);
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
                          bgcolor: 'background.level2',
                        },
                        '& [data-highlighted-chars]': {
                          bgcolor: 'background.level2',
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
    </>
  );
};

export const generateStaticParams = (): Promise<BlogProps['params'][]> =>
  getBlogs().then((blogs) => blogs.map(({ slug }) => ({ slug })));

export const generateMetadata = async ({
  params: { slug },
}: BlogProps): Promise<Metadata | undefined> => {
  const blog = await getBlogBySlug(slug);
  if (!blog) return;

  const { title, description, coverPhoto, createdAt, updatedAt, categories } =
    blog;
  const path = `/blog/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      authors: `${firstName} ${lastName}`,
      publishedTime: createdAt,
      modifiedTime: updatedAt,
      tags: categories,
      url: path,
      images: coverPhoto,
    },
  };
};

export default Blog;
