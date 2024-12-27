import {
  Badge,
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
import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

import { firstName, lastName } from '@/constants/me';
import { routes } from '@/constants/site-config';
import { getArticles } from '@/lib/queries';
import { dateFormatter } from '@/lib/utils';

const BlogPage: FC = async () => {
  const articles = await getArticles();
  const featuredArticle = articles.reduce((highestViewedArticle, article) =>
    article.view > highestViewedArticle.view ? article : highestViewedArticle,
  );

  return (
    <Container>
      <Section>
        <Button asChild highContrast size="3" variant="ghost">
          <Link href={routes.home.pathname}>
            <IconArrowLeft size={20} />
            {firstName} {lastName}
          </Link>
        </Button>
        <Card asChild mt="8" variant="ghost">
          <Link href={`${routes.blog.pathname}/${featuredArticle.slug}`}>
            <Grid asChild columns={{ sm: '2' }} gapX="5" gapY="4">
              <article>
                <div>
                  <Box
                    className="aspect-video rounded-[var(--card-border-radius)]"
                    overflow="hidden"
                    position="relative"
                    style={{ boxShadow: 'var(--base-card-surface-box-shadow)' }}
                  >
                    {featuredArticle.coverPhoto ? (
                      <Image
                        fill
                        alt={featuredArticle.title}
                        className="object-cover"
                        src={featuredArticle.coverPhoto}
                        sizes={[
                          `(min-width: 1136px) ${1136 / 2}px`, // container size 4 max width = 1136px
                          '(min-width: 768px) 50vw', // breakpoint sm = 768px
                          '100vw',
                        ].join(',')}
                      />
                    ) : null}
                  </Box>
                </div>
                <div>
                  {featuredArticle.categories &&
                  featuredArticle.categories.length > 0 ? (
                    <Flex gap="3">
                      {featuredArticle.categories.map((category) => (
                        <Badge key={category} size="3">
                          {category}
                        </Badge>
                      ))}
                    </Flex>
                  ) : null}
                  <Heading mt="4" size={{ initial: '4', xs: '6', md: '8' }}>
                    {featuredArticle.title}
                  </Heading>
                  <Text
                    className="line-clamp-3"
                    mt="2"
                    size={{ initial: '3', md: '4' }}
                  >
                    {featuredArticle.description}
                  </Text>
                  <Text color="gray" mt="2" size={{ initial: '2', md: '3' }}>
                    {dateFormatter.format(featuredArticle.createdAt)}
                  </Text>
                </div>
              </article>
            </Grid>
          </Link>
        </Card>
        <Grid columns={{ xs: '2', md: '3' }} gap="5" mt="8">
          {articles
            .filter(({ id }) => id !== featuredArticle.id)
            .map(
              ({ id, createdAt, coverPhoto, slug, title, categories = [] }) => (
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
                              `(min-width: 1136px) ${1136 / 2}px`, // container size 4 max width = 1136px
                              '(min-width: 1024px) 33vw', // breakpoint md = 1024px
                              '(min-width: 768px) 50vw', // breakpoint sm = 768px
                              '100vw',
                            ].join(',')}
                          />
                        ) : null}
                      </Box>
                      {categories.length > 0 ? (
                        <Flex gap="2" mt="3" wrap="wrap">
                          {categories.map((category) => (
                            <Badge key={category}>{category}</Badge>
                          ))}
                        </Flex>
                      ) : null}
                      <Heading mt="3" size="3">
                        {title}
                      </Heading>
                      <Text color="gray" mt="2" size="2">
                        {dateFormatter.format(createdAt)}
                      </Text>
                    </article>
                  </Link>
                </Card>
              ),
            )}
        </Grid>
      </Section>
    </Container>
  );
};

export default BlogPage;
