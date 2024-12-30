import { Button, Container, Flex, Section } from '@radix-ui/themes';
import { IconArrowLeft } from '@tabler/icons-react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type FC } from 'react';

import { IncrementView } from '@/components/article/increment-view';
import { JsonLd } from '@/components/article/json-ld';
import { MainContent } from '@/components/article/main-content';
import { SideBar } from '@/components/article/sidebar';
import { Footer } from '@/components/footer';
import { routes, siteUrl } from '@/constants/site-config';
import { getArticleBySlug, getArticles } from '@/lib/queries';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

const ArticlePage: FC<ArticlePageProps> = async ({ params }) => {
  const article = await getArticleBySlug((await params).slug);

  if (!article) notFound();

  return (
    <>
      <Container>
        <Section asChild>
          <main>
            <Button asChild highContrast size="3" variant="ghost">
              <Link href={routes.blog.pathname}>
                <IconArrowLeft size={20} />
                Blog
              </Link>
            </Button>
            <Flex
              asChild
              align="start"
              direction={{ initial: 'column', md: 'row' }}
              gap="8"
            >
              <article>
                <MainContent article={article} className="flex-1" />
                <SideBar
                  article={article}
                  position={{ md: 'sticky' }}
                  top="calc(var(--space-9) + 36px)" // container padding + Blog button button height
                  width={{ md: '350px' }}
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

export const generateStaticParams = async () => {
  const articles = await getArticles();
  return articles.map(({ slug }) => ({ slug })) satisfies Awaited<
    ArticlePageProps['params']
  >[];
};

export const generateMetadata = async ({ params }: ArticlePageProps) => {
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug);
  if (!article) return;

  const { title, description, coverPhoto, createdAt, updatedAt } = article;

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      authors: siteUrl,
      publishedTime: createdAt.toISOString(),
      modifiedTime: updatedAt.toISOString(),
      url: `${routes.blog.pathname}/${slug}`,
      images: coverPhoto,
    },
    alternates: {
      types: { 'application/rss+xml': routes.blogRssFeed.pathname },
    },
  } satisfies Metadata;
};

export default ArticlePage;
