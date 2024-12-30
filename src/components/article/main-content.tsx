import {
  Box,
  Flex,
  Heading,
  Section,
  type SectionProps,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import { type FC } from 'react';

import { type getArticleBySlug } from '@/lib/queries';
import { dateFormatter } from '@/lib/utils';

export interface MainContentProps extends Omit<SectionProps, 'children'> {
  article: NonNullable<Awaited<ReturnType<typeof getArticleBySlug>>>;
}

export const MainContent: FC<MainContentProps> = ({ article, ...props }) => (
  <Section {...props}>
    <Flex direction="column" gap="5">
      <Text color="gray">
        {dateFormatter.format(new Date(article.createdAt))}
      </Text>
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
  </Section>
);
