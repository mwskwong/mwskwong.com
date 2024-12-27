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
                    className="aspect-video overflow-hidden rounded-[var(--card-border-radius)]"
                    position="relative"
                  >
                    {featuredArticle.coverPhoto ? (
                      <Image
                        fill
                        alt={featuredArticle.title}
                        className="object-cover"
                        src={featuredArticle.coverPhoto}
                      />
                    ) : null}
                  </Box>
                </div>
                <Flex direction="column" gap="3">
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
                  <Heading size={{ initial: '4', xs: '6', md: '8' }}>
                    {featuredArticle.title}
                  </Heading>
                  <Text
                    className="line-clamp-3"
                    size={{ initial: '3', md: '4' }}
                  >
                    {featuredArticle.description}
                  </Text>
                  <Text color="gray" size={{ initial: '2', md: '3' }}>
                    {dateFormatter.format(featuredArticle.createdAt)}
                  </Text>
                </Flex>
              </article>
            </Grid>
          </Link>
        </Card>
      </Section>
    </Container>
  );
};

export default BlogPage;
