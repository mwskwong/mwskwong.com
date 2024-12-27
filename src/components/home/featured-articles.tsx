import {
  Button,
  Card,
  Flex,
  type FlexProps,
  Heading,
  Section,
  Text,
} from '@radix-ui/themes';
import { IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

import { routes } from '@/constants/site-config';
import { getArticles } from '@/lib/queries';
import { dateFormatter } from '@/lib/utils';

export type FeaturedArticlesProps = Omit<FlexProps, 'asChild' | 'children'>;
export const FeaturedArticles: FC<FeaturedArticlesProps> = async (props) => {
  const articles = (await getArticles())
    .toSorted((a, b) => b.view - a.view)
    .slice(0, 2);

  return (
    <Flex asChild align={{ sm: 'start' }} direction="column" gap="8" {...props}>
      <Section>
        <Heading as="h2" size="8">
          Featured Articles
        </Heading>
        <Flex direction="column" gap="8">
          {articles.map(
            ({ id, createdAt, coverPhoto, slug, title, description }) => (
              <Card key={id} asChild variant="ghost">
                <Link href={`${routes.blog.pathname}/${slug}`}>
                  <Flex
                    align="start"
                    direction={{ initial: 'column-reverse', sm: 'row' }}
                    gap="4"
                  >
                    {coverPhoto ? (
                      <Image
                        alt={title}
                        className="h-[108px] w-[192px] rounded-[var(--card-border-radius)] sm:h-[90px] sm:w-[160px]"
                        height={9 * 12}
                        src={coverPhoto}
                        width={16 * 12}
                        style={{
                          boxShadow: 'var(--base-card-surface-box-shadow)',
                        }}
                      />
                    ) : null}
                    <Flex direction="column" gap="2">
                      <Heading as="h3" size="4">
                        {title}
                      </Heading>
                      <Text as="p">{description}</Text>
                      <Text color="gray" size="2">
                        {dateFormatter.format(createdAt)}
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
              </Card>
            ),
          )}
        </Flex>
        <Button asChild highContrast size="3" variant="ghost">
          <Link href={routes.blog.pathname}>
            View all Articles <IconArrowRight size={20} />
          </Link>
        </Button>
      </Section>
    </Flex>
  );
};
