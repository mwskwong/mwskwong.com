import { Box, type BoxProps, Flex, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type FC } from 'react';

import { getArticleBySlug } from '@/lib/queries';
import { dateFormatter } from '@/lib/utils';

import { IncrementView } from './increment-view';

export interface MainContentProps extends Omit<BoxProps, 'children'> {
  slug: Promise<string>;
}

export const MainContent: FC<MainContentProps> = async ({ slug, ...props }) => {
  const article = await getArticleBySlug(await slug);

  if (!article) notFound();

  return (
    <>
      <Box {...props}>
        <Flex direction="column" gap="5">
          <Text color="gray">{dateFormatter.format(article.createdAt)}</Text>
          <Heading size={{ initial: '8', xs: '9' }}>{article.title}</Heading>
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
            <Image fill priority alt={article.title} src={article.coverPhoto} />
          </Box>
        ) : null}
        content...
      </Box>
      <IncrementView id={article.id} />
    </>
  );
};
