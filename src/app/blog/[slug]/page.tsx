import { Button, Container, Flex, Section } from '@radix-ui/themes';
import { IconArrowLeft } from '@tabler/icons-react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { type FC, Suspense } from 'react';

import { JsonLd } from '@/components/article/json-ld';
import { MainContent } from '@/components/article/main-content';
import { SideBar } from '@/components/article/sidebar';
import { Footer } from '@/components/footer';
import { routes, siteUrl } from '@/constants/site-config';
import { getArticleBySlug, getArticles } from '@/lib/queries';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// FIXME: confirm whether I can use "use cache" in dynamic route while accessing params
const ArticlePage: FC<ArticlePageProps> = ({ params }) => {
  const slug = params.then(({ slug }) => slug);

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
                <Suspense>
                  <MainContent className="flex-1" slug={slug} />
                  <SideBar
                    position={{ md: 'sticky' }}
                    slug={slug}
                    top="calc(var(--space-9) + 36px)" // container padding + Blog button button height
                    width={{ md: '350px' }}
                  />
                </Suspense>
              </article>
            </Flex>
          </main>
        </Section>
        <Footer />
      </Container>
      <Suspense>
        <JsonLd slug={slug} />
      </Suspense>
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
