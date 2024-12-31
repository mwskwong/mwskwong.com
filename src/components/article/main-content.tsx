import {
  Box,
  Code,
  Flex,
  Heading,
  Link,
  ScrollArea,
  Section,
  type SectionProps,
  Strong,
  Text,
} from '@radix-ui/themes';
import {
  type Icon,
  IconBrandJavascript,
  IconBrandReact,
  IconBrandTypescript,
  IconFile,
  IconJson,
} from '@tabler/icons-react';
import { type MDXComponents } from 'mdx/types';
import Image from 'next/image';
import NextLink from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { type FC } from 'react';
import { type Options, rehypePrettyCode } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

import { containerMaxWidth, md } from '@/constants/site-config';
import { type getArticleBySlug } from '@/lib/queries';
import { cn, dateFormatter } from '@/lib/utils';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-language'?: string;
    'data-rehype-pretty-code-figure'?: '';
    'data-rehype-pretty-code-title'?: '';
    'data-highlighted-chars'?: '';
  }
}

const LanguageIcons = {
  jsx: IconBrandReact,
  tsx: IconBrandReact,
  ts: IconBrandTypescript,
  js: IconBrandJavascript,
  mjs: IconBrandJavascript,
  json: IconJson,
  jsonc: IconJson,
} as Record<string, Icon>;

const components = {
  h2: ({ children, id, color, ...props }) => (
    <Heading as="h2" id={id} mb="3" mt="8" size="6" {...props}>
      <Link
        highContrast
        color="gray"
        href={id ? `#${id}` : undefined}
        style={{ color }}
        underline="hover"
      >
        {children}
      </Link>
    </Heading>
  ),
  h3: ({ children, id, color, ...props }) => (
    <Heading as="h3" id={id} mb="2" mt="7" size="4" {...props}>
      <Link
        highContrast
        color="gray"
        href={id ? `#${id}` : undefined}
        style={{ color }}
        underline="hover"
      >
        {children}
      </Link>
    </Heading>
  ),
  h4: ({ children, id, color, ...props }) => (
    <Heading as="h4" id={id} mb="2" mt="6" size="3" {...props}>
      <Link
        highContrast
        color="gray"
        href={id ? `#${id}` : undefined}
        style={{ color }}
        underline="hover"
      >
        {children}
      </Link>
    </Heading>
  ),
  p: ({ color, ...props }) => (
    <Text as="p" mb="4" style={{ color }} {...props} />
  ),
  a: ({ color, href = '', children, ...props }) => {
    const internal = href.startsWith('/');

    return (
      <Link
        asChild={internal}
        href={internal ? undefined : href}
        rel={internal ? undefined : 'noopener'}
        style={{ color }}
        target={internal ? undefined : '_blank'}
        {...props}
      >
        {internal ? <NextLink href={href}>{children}</NextLink> : children}
      </Link>
    );
  },
  strong: Strong,
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        'list-disc pl-[20px] [&>*:not(:first-child)]:pt-1 [&>*:not(:last-child)]:pb-1',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn('list-decimal pl-[20px] [&>*]:my-2', className)}
      {...props}
    />
  ),
  code: (props) => {
    const inlineCode = props.style === undefined;
    if (inlineCode) {
      const { color, ...rest } = props;
      return <Code color="indigo" style={{ color }} {...rest} />;
    }

    const { className, ...rest } = props;
    return (
      <Text asChild className={cn('bg-accent-2 p-rx-3', className)} size="2">
        <code {...rest} />
      </Text>
    );
  },
  figure: (props) => (
    <Box
      asChild
      className="overflow-hidden rounded-4"
      my="4"
      style={{ boxShadow: 'var(--base-card-surface-box-shadow)' }}
    >
      <figure {...props} />
    </Box>
  ),
  figcaption: ({ children, ...props }) => {
    const Icon = /\.[^.]+$/.test(children?.toString() ?? '')
      ? (LanguageIcons[props['data-language'] ?? ''] ?? IconFile)
      : null;

    return (
      <Flex asChild align="center" gap="2">
        <Text
          asChild
          className="p-rx-3"
          size="2"
          style={{ boxShadow: 'inset 0 -1px 0 0 var(--gray-a5)' }}
        >
          <figcaption {...props}>
            {Icon ? <Icon size={18} /> : null}
            {children}
          </figcaption>
        </Text>
      </Flex>
    );
  },
  pre: ({ tabIndex: _, ...props }) => (
    <ScrollArea>
      <pre {...props} />
    </ScrollArea>
  ),
  span: ({ className, ...props }) => (
    <span
      className={cn(
        '[&[data-highlighted-line]]:-mx-rx-3 [&[data-highlighted-line]]:bg-accentA-3 [&[data-highlighted-line]]:px-rx-3',
        className,
      )}
      {...props}
    />
  ),
} satisfies MDXComponents;

export interface MainContentProps extends Omit<SectionProps, 'children'> {
  article: NonNullable<Awaited<ReturnType<typeof getArticleBySlug>>>;
}

export const MainContent: FC<MainContentProps> = ({ article, ...props }) => (
  <Section {...props}>
    <Flex direction="column" gap="5">
      <Text color="gray">
        {dateFormatter.format(new Date(article.createdAt))}
      </Text>
      <Heading size="8">{article.title}</Heading>
      <Text size="4">{article.description}</Text>
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
          sizes={[
            `(min-width: ${containerMaxWidth}px) ${containerMaxWidth - 350}px`, // 350px is the side bar width
            `(min-width: ${md}px) calc(100vw - 350px)`,
            '100vw',
          ].join(',')}
        />
      </Box>
    ) : null}
    {article.content ? (
      <MDXRemote
        components={components}
        source={article.content}
        options={{
          mdxOptions: {
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: 'github-light-default',
                  keepBackground: false,
                } satisfies Options,
              ],
              rehypeSlug,
            ],
          },
        }}
      />
    ) : null}
  </Section>
);
