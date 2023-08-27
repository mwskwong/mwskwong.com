import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Metadata } from "next";
import { FC } from "react";

import BlogCard from "@/components/blog/blog-card";
import getBlogs from "@/lib/get-blogs";

import { metadata as rootMetadata } from "../layout";

const Blogs: FC = async () => {
  const blogs = await getBlogs();
  return (
    <Container sx={{ pt: 6, flex: 1 }}>
      <Stack spacing={6}>
        <Typography level="h1" textAlign="center">
          Blog
        </Typography>
        <Grid container spacing={2}>
          {blogs.map(
            ({ coverPhoto = "", categories, title, slug, updatedAt }) => (
              <Grid key={slug} xs={12} sm={6} md={4}>
                <BlogCard
                  coverImgSrc={coverPhoto}
                  categories={categories}
                  title={title}
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

const title = "Blog";
export const metadata: Metadata = {
  title,
  openGraph: {
    ...rootMetadata.openGraph,
    title,
    images: "opengraph-image.png",
  },
};

export default Blogs;
