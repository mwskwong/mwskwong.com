import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Metadata, ResolvingMetadata } from "next";
import { FC } from "react";

import BlogCard from "@/components/blog/blog-card";
import SectionDivider from "@/components/section-divider";
import getBlogs from "@/lib/get-blogs";

const Blogs: FC = async () => {
  const blogs = await getBlogs({ page: 1 });
  return (
    <>
      <Container component="main" sx={{ py: "var(--Section-paddingY)" }}>
        <Stack spacing={6}>
          <Stack spacing={2} textAlign="center">
            <Typography level="h1">Blog</Typography>
            <Typography>
              Personal perspectives on a broad range of topics.
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            {blogs.map(
              (
                {
                  coverPhoto = "",
                  categories,
                  title,
                  slug,
                  description,
                  updatedAt,
                },
                index,
              ) => (
                <Grid key={slug} xs={12} sm={6} md={4}>
                  <BlogCard
                    coverImgSrc={coverPhoto}
                    categories={categories}
                    title={title}
                    description={description}
                    href={`/blog/${slug}`}
                    updatedAt={updatedAt}
                    slotProps={{ image: { priority: index < 2 } }}
                  />
                </Grid>
              ),
            )}
          </Grid>
        </Stack>
      </Container>
      <SectionDivider bgcolor="var(--Footer-bg)" alignSelf="flex-end" />
    </>
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
