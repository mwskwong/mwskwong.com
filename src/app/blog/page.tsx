import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Metadata, ResolvingMetadata } from 'next';
// eslint-disable-next-line camelcase -- Next.js naming convention
import { unstable_cache } from 'next/cache';
import { FC } from 'react';

import { BlogCard } from '@/components/blog/blog-card';
import { SectionDivider } from '@/components/section-divider';
import { blogTags } from '@/lib/cache-tags';
import { getBlogs } from '@/lib/get-blogs';

const Blogs: FC = async () => {
  const blogs = await unstable_cache(getBlogs, [], {
    tags: blogTags.list({ page: 1 }),
  })({ page: 1 });

  return (
    <>
      <Container component="main" sx={{ py: 'var(--Section-paddingY)' }}>
        <Stack spacing={6}>
          <Stack spacing={2} textAlign="center">
            <Typography level="h1">Blog</Typography>
            <Typography>
              Personal perspectives on a broad range of topics.
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            {blogs.map(
              ({ coverPhoto = '', slug, createdAt, ...blog }, index) => (
                <Grid key={slug} md={4} sm={6} xs={12}>
                  <BlogCard
                    coverImgSrc={coverPhoto}
                    date={new Date(createdAt)}
                    href={`/blog/${slug}`}
                    slotProps={{ image: { priority: index < 2 } }}
                    sx={{ height: { sm: '100%' } }}
                    {...blog}
                  />
                </Grid>
              ),
            )}
          </Grid>
        </Stack>
      </Container>
      <SectionDivider bgcolor="var(--Footer-bg)" />
    </>
  );
};

export const generateMetadata = async (
  _: object,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const title = 'Blog';
  const path = '/blog';
  const { openGraph } = await parent;

  return {
    title,
    openGraph: { ...openGraph, title, url: path },
    alternates: { canonical: path },
  };
};

export default Blogs;
