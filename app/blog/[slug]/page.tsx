import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Metadata, ResolvingMetadata } from "next";
import NextLink from "next/link";
import { FC } from "react";

import Like from "@/components/blog/like";
import ShareDropDown from "@/components/blog/share-dropdown";
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
    <>
      <Link
        component={NextLink}
        href="/blog"
        startDecorator={<KeyboardArrowLeftRounded />}
        mb={8}
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
      >
        <Stack direction="row" spacing={1}>
          {blog.categories.map((category) => (
            <Chip key={category} color="primary">
              {category}
            </Chip>
          ))}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Like />
          <ShareDropDown url={url} {...blog} />
        </Stack>
      </Stack>
    </>
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
