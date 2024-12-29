import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  IconButton,
  Section,
  Text,
} from '@radix-ui/themes';
import {
  IconArrowLeft,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandX,
} from '@tabler/icons-react';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type FC } from 'react';
import { type BlogPosting, type BreadcrumbList, type Graph } from 'schema-dts';

import { Footer } from '@/components/footer';
import { firstName, headline, lastName } from '@/constants/me';
import { routes, siteUrl } from '@/constants/site-config';
import {
  getArticleBySlug,
  getArticles,
  getPersonalPortrait,
} from '@/lib/queries';
import { dateFormatter } from '@/lib/utils';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

const ArticlePage: FC<ArticlePageProps> = async ({ params }) => {
  const slug = (await params).slug;
  const [article, articles, { url: personalPortrait }] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
    getPersonalPortrait(),
  ]);
  if (!article) notFound();

  const featuredArticles = articles
    .filter(({ id }) => id !== article.id)
    .toSorted((a, b) => b.view - a.view)
    .slice(0, 3);

  const url = `${siteUrl}${routes.blog.pathname}/${slug}`;
  const shareContent = `"${article.title}" by ${firstName} ${lastName}`;
  const shareOptions = [
    {
      Icon: IconBrandX,
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${shareContent}&url=${url}`,
    },
    {
      Icon: IconBrandFacebook,
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      Icon: IconBrandLinkedin,
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      Icon: IconBrandReddit,
      name: 'Reddit',
      href: `http://www.reddit.com/submit/?url=${url}&title=${article.title}`,
    },
  ];

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
                <Box asChild width={{ md: '350px' }}>
                  <aside>
                    <Heading size="4">Posted By</Heading>
                    <Card asChild mt="4" variant="ghost">
                      <Link href={routes.home.pathname}>
                        <Flex align="center" gap="3">
                          {personalPortrait ? (
                            <Image
                              alt="personal portrait"
                              className="rounded-full border-2 border-accentA-8"
                              height={40}
                              src={personalPortrait}
                              width={40}
                            />
                          ) : null}
                          <div>
                            <Heading asChild size="3">
                              <p>
                                {firstName} {lastName}
                              </p>
                            </Heading>
                            <Text color="gray" size="2">
                              {headline}
                            </Text>
                          </div>
                        </Flex>
                      </Link>
                    </Card>
                    <Heading mt="8" size="4">
                      More articles
                    </Heading>
                    <Flex direction="column" gap="4" mt="4">
                      {featuredArticles.map(
                        ({ id, createdAt, coverPhoto, slug, title }) => (
                          <Card key={id} asChild variant="ghost">
                            <Link href={`${routes.blog.pathname}/${slug}`}>
                              <Flex align="start" gap="4">
                                {coverPhoto ? (
                                  <Image
                                    alt={title}
                                    className="rounded-[var(--card-border-radius)]"
                                    height={9 * 6}
                                    src={coverPhoto}
                                    width={16 * 6}
                                    style={{
                                      boxShadow:
                                        'var(--base-card-surface-box-shadow)',
                                    }}
                                  />
                                ) : null}
                                <div>
                                  <Heading className="line-clamp-2" size="3">
                                    {title}
                                  </Heading>
                                  <Text color="gray" size="2">
                                    {dateFormatter.format(createdAt)}
                                  </Text>
                                </div>
                              </Flex>
                            </Link>
                          </Card>
                        ),
                      )}
                    </Flex>
                    <Flex align="center" gap="4" justify="between" mt="8">
                      <Text>Share:</Text>
                      <Flex gap="4">
                        {shareOptions.map(({ Icon, href, name }) => (
                          <IconButton
                            key={name}
                            asChild
                            aria-label={name}
                            color="gray"
                            variant="ghost"
                          >
                            <a href={href} rel="noopener" target="_blank">
                              <Icon size={20} />
                            </a>
                          </IconButton>
                        ))}
                      </Flex>
                    </Flex>
                  </aside>
                </Box>
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
                url,
                // author: { '@id': person['@id'] },
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
              // person,
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
