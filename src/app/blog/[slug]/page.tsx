import { Container, Flex, Section } from "@radix-ui/themes";
import { type Metadata, type ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type FC } from "react";

import { IncrementView } from "@/components/blog-post/increment-view";
import { JsonLd } from "@/components/blog-post/json-ld";
import { MainContent } from "@/components/blog-post/main-content";
import { SideBar } from "@/components/blog-post/sidebar";
import { Breadcrumb } from "@/components/breadcrumb";
import { Footer } from "@/components/footer";
import { routes, siteUrl } from "@/constants/site-config";
import { getBlogPostBySlug } from "@/lib/queries";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const BlogPostPage: FC<BlogPostPageProps> = async ({ params }) => {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost) notFound();

  return (
    <>
      <Container>
        <Section asChild>
          <main>
            <Breadcrumb
              routes={[
                routes.home,
                routes.blog,
                {
                  name: blogPost.title,
                  pathname: `${routes.blog.pathname}/${slug}`,
                },
              ]}
            />
            <Flex
              asChild
              align="start"
              direction={{ initial: "column", md: "row" }}
              gap="8"
            >
              <article>
                <MainContent
                  blogPost={blogPost}
                  flexGrow="1"
                  flexShrink="1"
                  minWidth="0"
                  width="100%"
                />
                <SideBar
                  blogPost={blogPost}
                  position={{ md: "sticky" }}
                  top="calc(var(--space-9) + 24px)" // container padding + breadcrumb's height
                  width={{ md: "350px" }}
                />
              </article>
            </Flex>
          </main>
        </Section>
        <Footer />
      </Container>
      <IncrementView id={blogPost.id} />
      <JsonLd blogPost={blogPost} />
    </>
  );
};

// allow blog to revalidate in runtime, but statically render all paths the first time they're visited
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = () => [];

export const generateMetadata = async (
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata,
) => {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);
  const { openGraph } = await parent;

  if (!blogPost) return;
  const { title, summary, coverImage, publishedAt, updatedAt } = blogPost;

  return {
    title,
    description: summary,
    openGraph: {
      ...openGraph,
      type: "article",
      authors: siteUrl,
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      url: `${routes.blog.pathname}/${slug}`,
      images: coverImage,
    },
    alternates: {
      types: { "application/rss+xml": routes.blogRssFeed.pathname },
    },
  } satisfies Metadata;
};

export default BlogPostPage;
