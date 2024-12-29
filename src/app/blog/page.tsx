import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
} from '@radix-ui/themes';
import { IconArrowLeft } from '@tabler/icons-react';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

import { Footer } from '@/components/footer';
import { firstName, lastName } from '@/constants/me';
import { routes } from '@/constants/site-config';
import { getArticles } from '@/lib/queries';
import { dateFormatter } from '@/lib/utils';

const sm = 768;
const md = 1024;
const containerMaxWidth = 1136;

const BlogPage: FC = async () => {
  const articles = await getArticles();
  const featuredArticle = articles.reduce((highestViewedArticle, article) =>
    article.view > highestViewedArticle.view ? article : highestViewedArticle,
  );

  return (
    <Container>
      <Section asChild>
        <main>
          <Button asChild highContrast size="3" variant="ghost">
            <Link href={routes.home.pathname}>
              <IconArrowLeft size={20} />
              {firstName} {lastName}
            </Link>
          </Button>
          <Heading mt="2" size="9">
            Blog
          </Heading>
          <Card asChild mt="8" size={{ sm: '2', md: '3' }} variant="ghost">
            <Link href={`${routes.blog.pathname}/${featuredArticle.slug}`}>
              <Grid asChild columns={{ sm: '2' }} gapX="5" gapY="4">
                <article>
                  <div>
                    <Box
                      className="aspect-video rounded-[var(--card-border-radius)]"
                      overflow="hidden"
                      position="relative"
                      style={{
                        boxShadow: 'var(--base-card-surface-box-shadow)',
                      }}
                    >
                      {featuredArticle.coverPhoto ? (
                        <Image
                          fill
                          priority
                          alt={featuredArticle.title}
                          className="object-cover"
                          src={featuredArticle.coverPhoto}
                          sizes={[
                            `(min-width: ${containerMaxWidth}px) ${containerMaxWidth / 2}px`,
                            `(min-width: ${sm}px) 50vw`,
                            '100vw',
                          ].join(',')}
                        />
                      ) : null}
                    </Box>
                  </div>
                  <Flex direction="column" gap={{ initial: '2', sm: '3' }}>
                    <Heading size={{ initial: '4', xs: '6', md: '8' }}>
                      {featuredArticle.title}
                    </Heading>
                    <Text
                      className="line-clamp-3"
                      size={{ initial: '3', md: '4' }}
                    >
                      {featuredArticle.description}
                    </Text>
                    <Text as="p" color="gray" size={{ initial: '2', md: '3' }}>
                      {dateFormatter.format(featuredArticle.createdAt)}
                    </Text>
                  </Flex>
                </article>
              </Grid>
            </Link>
          </Card>
          <Grid
            columns={{ xs: '2', md: '3' }}
            gap="5"
            mt={{ initial: '5', xs: '8' }}
          >
            {articles
              .filter(({ id }) => id !== featuredArticle.id)
              .map(
                ({ id, createdAt, coverPhoto, slug, title, description }) => (
                  <Card key={id} asChild variant="ghost">
                    <Link href={`${routes.blog.pathname}/${slug}`}>
                      <article>
                        <Box
                          className="aspect-video rounded-[var(--card-border-radius)]"
                          overflow="hidden"
                          position="relative"
                          style={{
                            boxShadow: 'var(--base-card-surface-box-shadow)',
                          }}
                        >
                          {coverPhoto ? (
                            <Image
                              fill
                              alt={title}
                              className="object-cover"
                              src={coverPhoto}
                              sizes={[
                                `(min-width: ${containerMaxWidth}px) ${containerMaxWidth / 3}px`,
                                `(min-width: ${md}px) 33vw`,
                                `(min-width: ${sm}px) 50vw`,
                                '100vw',
                              ].join(',')}
                            />
                          ) : null}
                        </Box>
                        <Flex direction="column" gap="2" mt="4">
                          <Heading size="4">{title}</Heading>
                          <Text as="p" className="line-clamp-3" size="3">
                            {description}
                          </Text>
                          <Text as="p" color="gray" size="2">
                            {dateFormatter.format(createdAt)}
                          </Text>
                        </Flex>
                      </article>
                    </Link>
                  </Card>
                ),
              )}
          </Grid>
        </main>
      </Section>
      <Footer />
    </Container>
  );
};

export const metadata = {
  title: routes.blog.name,
  alternates: {
    types: { 'application/rss+xml': routes.blogRssFeed.pathname },
  },
} satisfies Metadata;

export default BlogPage;
