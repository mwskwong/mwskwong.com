/* eslint-disable no-console -- debug */
import { KeyboardArrowRightRounded } from '@mui/icons-material';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Metadata, ResolvingMetadata } from 'next';
import { unstable_cache } from 'next/cache';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { FC } from 'react';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';

import { Actions } from '@/components/blog/actions';
import { CoverImage } from '@/components/blog/cover-image';
import { Heading } from '@/components/blog/heading';
import { SectionDivider } from '@/components/section-divider';
import { contact } from '@/constants/nav';
import { prisma } from '@/lib/db';
import { getBlogBySlug } from '@/lib/get-blog-by-slug';
import { getIconByProgrammingLanguage } from '@/utils/get-icon-by-programming-language';
import { getSsrRehypeCodeHighlighter } from '@/utils/get-ssr-rehype-code-highlighter';

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

interface BlogProps {
  params: { slug: string };
}

const Blog: FC<BlogProps> = async ({ params: { slug } }) => {
  console.error(new Date().toISOString());
  const blog = await unstable_cache(getBlogBySlug)(slug);
  if (!blog) notFound();

  const metadata = await prisma.blogMetadata.findUnique({
    where: { id: blog.id },
  });

  console.error(new Date().toISOString());

  return (
    <>
      <main>
        <Container
          component="article"
          maxWidth="md"
          sx={{ py: 'var(--Section-paddingY)' }}
        >
          <Typography level="body-xs">
            {dateFormatter.format(new Date(blog.createdAt))}
          </Typography>
          <Typography level="h1" mb={3} mt={1}>
            {blog.title}
          </Typography>
          <Grid alignItems="center" container mb={2} spacing={2}>
            <Grid sm xs={12}>
              <Stack direction="row" flexWrap="wrap" spacing={1}>
                {blog.categories.map((category) => (
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
                // @ts-expect-error LegacyRef passed to RefObject
                ul: (props) => <Box component="ul" my={2} pl={3} {...props} />,
                // @ts-expect-error LegacyRef passed to RefObject
                ol: (props) => <Box component="ol" my={2} pl={3} {...props} />,
                // @ts-expect-error LegacyRef passed to RefObject
                li: (props) => <Box component="li" my={1} {...props} />,
                div: (props) => {
                  const codeBlock =
                    props['data-rehype-pretty-code-fragment'] === '';
                  const codeTitle =
                    props['data-rehype-pretty-code-title'] === '';

                  if (codeBlock) {
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Box
                        bgcolor="background.body"
                        border={1}
                        borderColor="neutral.outlinedBorder"
                        borderRadius="md"
                        data-joy-color-scheme="dark"
                        my={2}
                        overflow="hidden"
                        {...props}
                      />
                    );
                  }

                  if (codeTitle) {
                    const language = props['data-language'];
                    const Icon =
                      language && getIconByProgrammingLanguage(language);
                    const { children, ...rest } = props;
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Stack
                        borderBottom={1}
                        borderColor="neutral.outlinedBorder"
                        direction="row"
                        px={2}
                        py={1.5}
                        spacing={1}
                        {...rest}
                      >
                        {Icon ? <Icon size="sm" /> : null}
                        <Typography level="body-sm">{children}</Typography>
                      </Stack>
                    );
                  }

                  return <div {...props} />;
                },

                pre: ({ style, ...props }) => {
                  return (
                    // @ts-expect-error LegacyRef passed to RefObject
                    <Box
                      bgcolor="background.surface"
                      component="pre"
                      my={0}
                      overflow="auto"
                      py={2}
                      style={style}
                      {...props}
                    />
                  );
                },
                code: (props) => {
                  const inlineCode = props['data-language'] === undefined;

                  if (inlineCode) {
                    const { color, ...rest } = props;
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Typography
                        component="code"
                        display="inline"
                        fontFamily="code"
                        fontSize="0.875em"
                        mx={0}
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
                        '& > [data-line]': {
                          px: 2,
                        },
                        '& > [data-highlighted-line]': {
                          bgcolor: 'neutral.softBg',
                        },
                        '& [data-highlighted-chars]': {
                          bgcolor: 'neutral.softBg',
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
                        getHighlighter: getSsrRehypeCodeHighlighter,
                      } satisfies Options,
                    ],
                  ],
                },
              }}
              source={blog.content}
            />
          ) : null}
        </Container>
        <SectionDivider bgcolor="primary.solidBg" />
        <Sheet
          color="primary"
          component="section"
          invertedColors
          variant="solid"
        >
          <Container>
            <Stack alignItems={{ sm: 'center' }} spacing={6} textAlign="center">
              <Typography level="h2">Any Questions or Comments?</Typography>
              <Button
                component={NextLink}
                endDecorator={<KeyboardArrowRightRounded />}
                href={contact.href}
                size="lg"
              >
                Contact Me
              </Button>
            </Stack>
          </Container>
        </Sheet>
      </main>
      <SectionDivider bgcolor="var(--Footer-bg)" color="primary.solidBg" />
    </>
  );
};

export const generateMetadata = async (
  { params: { slug } }: BlogProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title, description, coverPhoto } =
    (await unstable_cache(getBlogBySlug)(slug)) ?? {};
  const path = `/blog/${slug}`;
  const { openGraph } = await parent;

  return {
    title,
    description,
    openGraph: {
      ...openGraph,
      title,
      description,
      url: path,
      images: coverPhoto,
    },
    alternates: { canonical: path },
  };
};

export default Blog;
