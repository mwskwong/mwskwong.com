import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Container from "@mui/joy/Container";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import { SvgIconProps } from "@mui/joy/SvgIcon";
import Typography from "@mui/joy/Typography";
import { Metadata, ResolvingMetadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import NextLink from "next/link";
import { FC, NamedExoticComponent } from "react";
import rehypePrettyCode from "rehype-pretty-code";

import ShareDropDown from "@/components/blog/share-dropdown";
import JavaScript from "@/components/icons/javascript";
import Json from "@/components/icons/json";
import TypeScript from "@/components/icons/typescript";
import Image from "@/components/image";
import getBlogBySlug from "@/lib/get-blog";
import getBlogs from "@/lib/get-blogs";

interface Props {
  params: { slug: string };
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const languageIcons: Record<
  string,
  NamedExoticComponent<SvgIconProps> | undefined
> = {
  js: JavaScript,
  jsx: JavaScript,
  ts: TypeScript,
  tsx: TypeScript,
  json: Json,
};

const Blog: FC<Props> = async ({ params: { slug } }) => {
  const blog = await getBlogBySlug(slug);
  const url = `${process.env.NEXT_PUBLIC_URL}/blog/${slug}`;

  return (
    <Container component="article" maxWidth="md">
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
      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Stack direction="row" spacing={1}>
          {blog.categories.map((category) => (
            <Chip key={category} color="primary">
              {category}
            </Chip>
          ))}
        </Stack>
        <ShareDropDown blog={{ url, ...blog }} />
      </Stack>
      {blog.coverPhoto && (
        <Image
          src={blog.coverPhoto}
          role="presentation"
          alt=""
          // WORKAROUND: Next.js requires width and height to be specified for remote image
          // while with sizes specified, they are meaningless in this case meaningless
          width={0}
          height={0}
          sizes="100vw"
          priority
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "md",
            border: 1,
            borderColor: "neutral.outlinedBorder",
            objectFit: "cover",
            aspectRatio: "1200/630",
          }}
        />
      )}
      {blog.content && (
        <MDXRemote
          source={blog.content}
          components={{
            h2: ({ color, ref, ...props }) => (
              <Typography
                level="h2"
                mt={6}
                mb={3}
                textColor={color}
                {...props}
              />
            ),
            h3: ({ color, ref, ...props }) => (
              <Typography
                level="h3"
                mt={4}
                mb={1.5}
                textColor={color}
                {...props}
              />
            ),
            h4: ({ color, ref, ...props }) => (
              <Typography
                level="h4"
                mt={3}
                mb={1}
                textColor={color}
                {...props}
              />
            ),
            p: ({ color, ref, ...props }) => (
              <Typography mb={2} textColor={color} {...props} />
            ),
            a: ({ color, ref, ...props }) => (
              <Link underline="always" textColor={color} {...props} />
            ),
            li: ({ ref, ...props }) => <Box component="li" my={1} {...props} />,
            div: (props) => {
              const codeFragment =
                // @ts-expect-error data attribute auto injected by rehype-pretty-code
                (props["data-rehype-pretty-code-fragment"] as
                  | ""
                  | undefined) === "";

              const codeTitle =
                // @ts-expect-error data attribute auto injected by rehype-pretty-code
                (props["data-rehype-pretty-code-title"] as "" | undefined) ===
                "";

              if (codeFragment) {
                const { ref, ...rest } = props;
                return (
                  <Box
                    borderRadius="md"
                    border={1}
                    borderColor="neutral.outlinedBorder"
                    my={2}
                    overflow="hidden"
                    {...rest}
                  />
                );
              }

              if (codeTitle) {
                // @ts-expect-error data attribute auto injected by rehype-pretty-code
                const language = props["data-language"] as string;
                const Icon = languageIcons[language];
                const { ref, children, ...rest } = props;
                return (
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
            pre: ({ ref, style, ...props }) => (
              <Box
                data-joy-color-scheme="dark"
                component="pre"
                overflow="auto"
                my={0}
                py={2}
                bgcolor="background.surface"
                sx={{
                  "& code": {
                    display: "grid",
                    counterReset: "line",
                  },
                  "& [data-line]": {
                    px: 2,
                  },
                  "& [data-highlighted-line]": {
                    bgcolor: "neutral.softBg",
                  },
                  "& [data-highlighted-chars]": {
                    bgcolor: "neutral.softBg",
                    borderRadius: "xs",
                  },
                }}
                {...props}
              />
            ),
            code: (props) => {
              // @ts-expect-error data attribute auto injected by rehype-pretty-code
              const inlineCode = !props["data-language"] as string | undefined;

              if (inlineCode) {
                const { ref, color, ...rest } = props;
                return (
                  <Typography
                    component="code"
                    variant="soft"
                    level="body-sm"
                    fontFamily="code"
                    textColor={color}
                    {...rest}
                  />
                );
              }

              return <code {...props} />;
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
  );
};

export const generateStaticParams = () =>
  getBlogs().then((blogs) => blogs.map(({ slug }) => ({ slug })));

export const generateMetadata = async (
  { params: { slug } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title, description, coverPhoto } = await getBlogBySlug(slug);
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
