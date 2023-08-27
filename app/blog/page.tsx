import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Metadata, ResolvingMetadata } from "next";
import { FC } from "react";

import BlogCard from "@/components/blog/blog-card";
import getBlogs from "@/lib/get-blogs";

const Blogs: FC = async () => {
  const blogs = await getBlogs();
  return (
    <Container>
      <Stack spacing={6}>
        <Typography level="h1" textAlign="center">
          Blog
        </Typography>
        <Grid container spacing={2}>
          {blogs.map(
            ({
              coverPhoto = "",
              categories,
              title,
              slug,
              description,
              updatedAt,
            }) => (
              <Grid key={slug} xs={12} sm={6} md={4}>
                <BlogCard
                  coverImgSrc={coverPhoto}
                  categories={categories}
                  title={title}
                  description={description}
                  href={`/blog/${slug}`}
                  updatedAt={updatedAt}
                />
              </Grid>
            ),
          )}
        </Grid>
      </Stack>
    </Container>
  );
};

export const generateMetadata = async (
  _: object,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const title = "Blog";
  const path = "/blog";
  const { openGraph } = await parent;

  return {
    title,
    openGraph: { ...openGraph, title, url: path },
    alternates: { canonical: path },
  };
};

export default Blogs;
