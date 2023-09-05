import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Container from "@mui/joy/Container";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Metadata, ResolvingMetadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";
import rehypePrettyCode from "rehype-pretty-code";

import CoverImage from "@/components/blog/cover-image";
import Heading from "@/components/blog/heading";
import SectionDivider from "@/components/section-divider";
import { contact } from "@/constants/nav";
import getBlogBySlug from "@/lib/get-blog-by-slug";
import getBlogs from "@/lib/get-blogs";
import getIconByProgrammingLanguage from "@/utils/get-icon-by-programming-language";

// data attribute auto injected by rehype-pretty-code
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    "data-language"?: string;
    "data-rehype-pretty-code-fragment"?: "";
    "data-rehype-pretty-code-title"?: "";
  }
}

interface Props {
  params: { slug: string };
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const Blog: FC<Props> = async ({ params: { slug } }) => {
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <>
      <main>
        <Container
          component="article"
          maxWidth="md"
          sx={{ py: "var(--Section-paddingY)" }}
        >
          <Link
            component={NextLink}
            href="/blog"
            startDecorator={<KeyboardArrowLeftRounded />}
            mb={2}
          >
            Back to Blog
          </Link>
          <Typography level="body-xs">
            {dateFormatter.format(blog.updatedAt)}
          </Typography>
          <Typography level="h1" mt={1} mb={3}>
            {blog.title}
          </Typography>
          <Stack direction="row" spacing={1} mb={4}>
            {blog.categories.map((category) => (
              <Chip key={category} color="primary">
                {category}
              </Chip>
            ))}
          </Stack>
          {blog.coverPhoto && <CoverImage src={blog.coverPhoto} />}
          {blog.content && (
            <MDXRemote
              source={blog.content}
              components={{
                h2: ({ color, ...props }) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <Heading
                    level="h2"
                    mt={6}
                    mb={3}
                    textColor={color}
                    {...props}
                  />
                ),
                h3: ({ color, ...props }) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <Heading
                    level="h3"
                    mt={4}
                    mb={1.5}
                    textColor={color}
                    {...props}
                  />
                ),
                h4: ({ color, ...props }) => (
                  // @ts-expect-error LegacyRef passed to RefObject
                  <Heading
                    level="h4"
                    mt={3}
                    mb={1}
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
                  <Link
                    underline="always"
                    textColor={color}
                    target="_blank"
                    sx={{ "& > code": { color: "inherit" } }}
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
                    props["data-rehype-pretty-code-fragment"] === "";
                  const codeTitle =
                    props["data-rehype-pretty-code-title"] === "";

                  if (codeBlock) {
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Box
                        data-joy-color-scheme="dark"
                        bgcolor="background.body"
                        borderRadius="md"
                        border={1}
                        borderColor="neutral.outlinedBorder"
                        my={2}
                        overflow="hidden"
                        {...props}
                      />
                    );
                  }

                  if (codeTitle) {
                    const language = props["data-language"];
                    const Icon =
                      language && getIconByProgrammingLanguage(language);
                    const { children, ...rest } = props;
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Stack
                        direction="row"
                        spacing={1}
                        px={2}
                        py={1.5}
                        borderBottom={1}
                        borderColor="neutral.outlinedBorder"
                        {...rest}
                      >
                        {Icon && <Icon size="sm" />}
                        <Typography level="body-sm">{children}</Typography>
                      </Stack>
                    );
                  }

                  return <div {...props} />;
                },

                pre: ({
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  style: { backgroundColor, ...style } = {},
                  ...props
                }) => {
                  return (
                    // @ts-expect-error LegacyRef passed to RefObject
                    <Box
                      component="pre"
                      overflow="auto"
                      my={0}
                      py={2}
                      bgcolor="background.surface"
                      style={style}
                      {...props}
                    />
                  );
                },
                code: (props) => {
                  const inlineCode = !props["data-language"];

                  if (inlineCode) {
                    const { color, ...rest } = props;
                    return (
                      // @ts-expect-error LegacyRef passed to RefObject
                      <Typography
                        component="code"
                        variant="soft"
                        fontFamily="code"
                        fontSize="0.875em"
                        display="inline"
                        mx={0}
                        textColor={color}
                        {...rest}
                      />
                    );
                  }

                  return (
                    // @ts-expect-error LegacyRef passed to RefObject
                    <Box
                      component="code"
                      sx={{
                        "& > [data-line]": {
                          px: 2,
                        },
                        "& > [data-highlighted-line]": {
                          bgcolor: "neutral.softBg",
                        },
                        "& [data-highlighted-chars]": {
                          bgcolor: "neutral.softBg",
                          borderRadius: "xs",
                          py: "min(0.1em, 4px)",
                          px: "0.25em",
                        },
                      }}
                      {...props}
                    />
                  );
                },
              }}
              options={{
                mdxOptions: {
                  rehypePlugins: [[rehypePrettyCode, { theme: "dark-plus" }]],
                },
              }}
            />
          )}
        </Container>
        <SectionDivider bgcolor="primary.solidBg" />
        <Sheet
          component="section"
          variant="solid"
          color="primary"
          invertedColors
        >
          <Container>
            <Stack spacing={6} alignItems={{ sm: "center" }} textAlign="center">
              <Typography level="h2">Any Questions or Comments?</Typography>
              <Button
                size="lg"
                endDecorator={<KeyboardArrowRightRounded />}
                component={NextLink}
                href={contact.href}
              >
                Contact Me
              </Button>
            </Stack>
          </Container>
        </Sheet>
      </main>
      <SectionDivider color="primary.solidBg" bgcolor="var(--Footer-bg)" />
    </>
  );
};

export const generateStaticParams = () =>
  getBlogs().then((blogs) => blogs.map(({ slug }) => ({ slug })));

export const generateMetadata = async (
  { params: { slug } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title, description, coverPhoto } = (await getBlogBySlug(slug)) ?? {};
  const path = `/blog/${slug}`;
  const { openGraph } = await parent;

  return {
    title,
    description,
    openGraph: {
      ...openGraph,
      title: title,
      description,
      url: path,
      images: coverPhoto,
    },
    alternates: { canonical: path },
  };
};

export default Blog;
