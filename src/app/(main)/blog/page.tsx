import { VisibilityRounded } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/joy';
import { Metadata, ResolvingMetadata } from 'next';
import NextLink from 'next/link';
import { FC } from 'react';

import { BlogCardImage } from '@/components/blog/blog-card-image';
import { SectionDivider } from '@/components/section-divider';
import { prisma } from '@/lib/db';
import { getBlogs } from '@/lib/get-blogs';

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

const Blogs: FC = async () => {
  const blogs = await getBlogs({ page: 1 });
  const blogsMetadata = await prisma.blogMetadata.findMany({
    where: { id: { in: blogs.map(({ id }) => id) } },
  });

  return (
    <>
      <Container component="main" sx={{ py: 'var(--Section-paddingY)' }}>
        <Stack spacing={8}>
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
                  id,
                  updatedAt,
                  coverPhoto = '',
                  slug,
                  title,
                  description,
                  categories,
                },
                index,
              ) => (
                <Grid key={id} md={4} sm={6} xs={12}>
                  <Card component="article" sx={{ height: { sm: '100%' } }}>
                    <BlogCardImage priority={index === 0} src={coverPhoto} />
                    <Stack direction="row" flexWrap="wrap" spacing={1}>
                      {categories?.map((category) => (
                        <Chip color="primary" key={category}>
                          {category}
                        </Chip>
                      ))}
                    </Stack>
                    <CardContent>
                      <Link
                        color="neutral"
                        component={NextLink}
                        display="-webkit-box"
                        href={`/blog/${slug}`}
                        overflow="hidden"
                        overlay
                        sx={{ WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                        typography="title-lg"
                      >
                        {title}
                      </Link>
                      <Typography
                        display="-webkit-box"
                        overflow="hidden"
                        sx={{ WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
                      >
                        {description}
                      </Typography>
                    </CardContent>
                    <CardContent orientation="horizontal" sx={{ flex: 0 }}>
                      <Typography level="body-sm">
                        {dateFormatter.format(new Date(updatedAt))}
                      </Typography>
                      <Divider orientation="vertical" />
                      <Typography
                        level="body-sm"
                        startDecorator={<VisibilityRounded />}
                      >
                        {numberFormatter.format(
                          blogsMetadata.find(
                            ({ id: blogMetadataId }) => blogMetadataId === id,
                          )?.view ?? 0,
                        )}{' '}
                        views
                      </Typography>
                    </CardContent>
                  </Card>
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

export const revalidate = 3600;

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
  };
};

export default Blogs;
