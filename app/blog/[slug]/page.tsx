import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Container from "@mui/joy/Container";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Metadata, ResolvingMetadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import NextLink from "next/link";
import { FC } from "react";

import ShareDropDown from "@/components/blog/share-dropdown";
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
            /* eslint-disable @typescript-eslint/no-unused-vars */
            h2: ({ color, ref, ...props }) => (
              <Typography level="h2" mt={6} mb={3} {...props} />
            ),
            h3: ({ color, ref, ...props }) => (
              <Typography level="h3" mt={4} mb={1.5} {...props} />
            ),
            h4: ({ color, ref, ...props }) => (
              <Typography level="h4" mt={3} mb={1} {...props} />
            ),
            p: ({ color, ref, ...props }) => <Typography mb={2} {...props} />,
            a: ({ color, ref, ...props }) => (
              <Link underline="always" {...props} />
            ),
            li: ({ color, ref, ...props }) => (
              <Box component="li" my={1} {...props} />
            ),
            /* eslint-enable */
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
