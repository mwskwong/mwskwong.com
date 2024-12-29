import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from '@radix-ui/themes';
import { IconArrowLeft } from '@tabler/icons-react';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type FC } from 'react';
import {
  type BlogPosting,
  type BreadcrumbList,
  type Graph,
  type Person,
} from 'schema-dts';

import { SideBar } from '@/components/article/sidebar';
import { Footer } from '@/components/footer';
import {
  address,
  email,
  firstName,
  github,
  lastName,
  linkedin,
  selfIntroduction,
  stackoverflow,
} from '@/constants/me';
import { routes, siteUrl } from '@/constants/site-config';
import {
  getArticleBySlug,
  getArticles,
  getExperiences,
  getPersonalPortrait,
} from '@/lib/queries';
import { dateFormatter } from '@/lib/utils';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

const ArticlePage: FC<ArticlePageProps> = async ({ params }) => {
  const slug = (await params).slug;
  const [article, { url: personalPortrait }, latestJobTitle] =
    await Promise.all([
      getArticleBySlug(slug),
      getPersonalPortrait(),
      getExperiences().then((experience) => experience[0]?.jobTitle),
    ]);

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
              direction={{ initial: 'column', md: 'row' }}
              gap="8"
              mt="8"
            >
              <article>
                <Box className="flex-1">
                  <Flex direction="column" gap="5">
                    <Text color="gray">
                      {dateFormatter.format(article.createdAt)}
                    </Text>
                    <Heading size={{ initial: '8', xs: '9' }}>
                      {article.title}
                    </Heading>
                    <Text size="5">{article.description}</Text>
                  </Flex>
                  {article.coverPhoto ? (
                    <Box
                      className="aspect-video rounded-6"
                      my="8"
                      overflow="hidden"
                      position="relative"
                      style={{
                        boxShadow: 'var(--base-card-surface-box-shadow)',
                      }}
                    >
                      <Image
                        fill
                        priority
                        alt={article.title}
                        src={article.coverPhoto}
                      />
                    </Box>
                  ) : null}
                  content...
                </Box>
                <SideBar article={article} width={{ md: '350px' }} />
              </article>
            </Flex>
          </main>
        </Section>
        <Footer />
      </Container>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BlogPosting',
                headline: article.title,
                description: article.description,
                image: article.coverPhoto,
                datePublished: article.createdAt.toISOString(),
                dateModified: article.updatedAt.toISOString(),
                url: `${siteUrl}${routes.blog.pathname}/${slug}`,
                author: { '@id': 'mwskwong' },
              } satisfies BlogPosting,
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    name: routes.home.name,
                    item: siteUrl,
                    position: 1,
                  },
                  {
                    '@type': 'ListItem',
                    name: routes.blog.name,
                    item: siteUrl + routes.blog.pathname,
                    position: 2,
                  },
                  {
                    '@type': 'ListItem',
                    name: article.title,
                    position: 3,
                  },
                ],
                name: 'Breadcrumbs',
              } satisfies BreadcrumbList,
              {
                '@id': 'mwskwong',
                '@type': 'Person',
                name: `${firstName} ${lastName}`,
                alternateName: 'mwskwong',
                jobTitle: latestJobTitle,
                email,
                address,
                url: siteUrl,
                image: personalPortrait,
                sameAs: [github, linkedin, stackoverflow],
                description: selfIntroduction,
              } satisfies Person,
            ],
          } satisfies Graph),
        }}
        type="application/ld+json"
      />
    </>
  );
};

export const generateStaticParams = () =>
  getArticles().then((articles) =>
    articles.map(({ slug }) => ({ slug })),
  ) satisfies Promise<Awaited<ArticlePageProps['params']>[]>;

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
