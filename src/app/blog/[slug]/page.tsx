import { Container, Flex, Section } from "@radix-ui/themes";
import { type Metadata, type ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type FC } from "react";

import { IncrementView } from "@/components/article/increment-view";
import { JsonLd } from "@/components/article/json-ld";
import { MainContent } from "@/components/article/main-content";
import { SideBar } from "@/components/article/sidebar";
import { Breadcrumb } from "@/components/breadcrumb";
import { Footer } from "@/components/footer";
import { routes, siteUrl } from "@/constants/site-config";
import { getArticleBySlug } from "@/lib/queries";

interface ArticlePageProperties {
  params: Promise<{ slug: string }>;
}

const ArticlePage: FC<ArticlePageProperties> = async ({ params }) => {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

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
                  name: article.title,
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
                  article={article}
                  flexGrow="1"
                  flexShrink="1"
                  minWidth="0"
                  width="100%"
                />
                <SideBar
                  article={article}
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
      <IncrementView id={article.id} />
      <JsonLd article={article} />
    </>
  );
};

// allow blog to revalidate in runtime, but statically render all paths the first time they're visited
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = () => [];

export const generateMetadata = async (
  { params }: ArticlePageProperties,
  parent: ResolvingMetadata,
) => {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const { openGraph } = await parent;

  if (!article) return;
  const { title, description, coverPhoto, createdAt, updatedAt } = article;

  return {
    title,
    description,
    openGraph: {
      ...openGraph,
      type: "article",
      authors: siteUrl,
      publishedTime: createdAt,
      modifiedTime: updatedAt,
      url: `${routes.blog.pathname}/${slug}`,
      images: coverPhoto,
    },
    alternates: {
      types: { "application/rss+xml": routes.blogRssFeed.pathname },
    },
  } satisfies Metadata;
};

export default ArticlePage;
