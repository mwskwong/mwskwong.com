import { Container, Flex, Section } from "@radix-ui/themes";
import { type Metadata, type ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type FC } from "react";
import { type BlogPosting, type BreadcrumbList, type Graph } from "schema-dts";

import { IncrementView } from "@/components/blog-post/increment-view";
import { MainContent } from "@/components/blog-post/main-content";
import { SideBar } from "@/components/blog-post/sidebar";
import { Breadcrumb } from "@/components/breadcrumb";
import { Footer } from "@/components/footer";
import {
  address,
  email,
  firstName,
  github,
  lastName,
  linkedin,
  selfIntroduction,
  stackoverflow,
} from "@/constants/me";
import { routes, siteUrl } from "@/constants/site-config";
import {
  getBlogPostBySlug,
  getExperiences,
  getPersonalPortrait,
} from "@/lib/queries";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const BlogPostPage: FC<BlogPostPageProps> = async ({ params }) => {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);
  if (!blogPost) notFound();

  const [personalPortrait, latestJobTitle] = await Promise.all([
    getPersonalPortrait(),
    getExperiences().then((experience) => experience[0]?.jobTitle),
  ]);

  return (
    <>
      <IncrementView id={blogPost.id} />
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
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                headline: blogPost.title,
                description: blogPost.summary,
                image: blogPost.coverImage,
                datePublished: blogPost.publishedAt,
                dateModified: blogPost.updatedAt,
                url: `${siteUrl}${routes.blog.pathname}/${blogPost.slug}`,
                author: {
                  "@type": "Person",
                  name: `${firstName} ${lastName}`,
                  alternateName: "mwskwong",
                  jobTitle: latestJobTitle,
                  email,
                  address,
                  url: siteUrl,
                  image: personalPortrait,
                  sameAs: [github, linkedin, stackoverflow],
                  description: selfIntroduction,
                },
              } satisfies BlogPosting,
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    name: routes.home.name,
                    item: siteUrl,
                    position: 1,
                  },
                  {
                    "@type": "ListItem",
                    name: routes.blog.name,
                    item: siteUrl + routes.blog.pathname,
                    position: 2,
                  },
                  {
                    "@type": "ListItem",
                    name: blogPost.title,
                    position: 3,
                  },
                ],
                name: "Breadcrumbs",
              } satisfies BreadcrumbList,
            ],
          } satisfies Graph),
        }}
        type="application/ld+json"
      />
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
