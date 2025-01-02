import '@radix-ui/themes/tokens/colors/blue.css';
import '@radix-ui/themes/tokens/colors/amber.css';
import '@radix-ui/themes/tokens/colors/red.css';

import {
  Box,
  Card,
  Code,
  Flex,
  Heading,
  Inset,
  Link,
  ScrollArea,
  Section,
  type SectionProps,
  Strong,
  Text,
} from '@radix-ui/themes';
import * as Callout from '@radix-ui/themes/components/callout'; // compound component needs to be imported from individual entry point to avoid the entire @radix-ui/themes being bundled in the client bundle
import {
  IconAlertTriangle,
  IconExclamationCircle,
  IconInfoCircle,
} from '@tabler/icons-react';
import { type MDXComponents } from 'mdx/types';
import Image from 'next/image';
import NextLink from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import {
  type FC,
  type HTMLAttributes,
  type HTMLElement,
  type PropsWithChildren,
  isValidElement,
} from 'react';
import { type Options, rehypePrettyCode } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { remarkAlert } from 'remark-github-blockquote-alert';

import { containerMaxWidth, md } from '@/constants/site-config';
import { type getArticleBySlug } from '@/lib/queries';
import { cn, dateFormatter } from '@/lib/utils';

import { CopyCodeButton } from './copy-code-button';

const getCalloutSeverity = <T extends HTMLAttributes<HTMLElement>>({
  className,
}: T) => {
  if (className?.includes('markdown-alert-note')) {
    return { color: 'blue', Icon: IconInfoCircle } as const;
  }

  if (className?.includes('markdown-alert-warning')) {
    return { color: 'amber', Icon: IconAlertTriangle } as const;
  }

  if (className?.includes('markdown-alert-caution')) {
    return { color: 'red', Icon: IconExclamationCircle } as const;
  }
};

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
    <Box asChild pl="20px">
      <ul
        className={cn(
          'list-disc [&>*:not(:first-child)]:pt-1 [&>*:not(:last-child)]:pb-1',
          className,
        )}
        {...props}
      />
    </Box>
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
      <Text
        asChild
        size="2"
        className={cn(
          'bg-accent-2 p-[var(--card-padding)] pr-[40px]',
          '[&>span[data-highlighted-line]]:-ml-[var(--card-padding)] [&>span[data-highlighted-line]]:-mr-[40px] [&>span[data-highlighted-line]]:bg-accentA-3 [&>span[data-highlighted-line]]:pl-[var(--card-padding)] [&>span[data-highlighted-line]]:pr-[40px]',
          className,
        )}
      >
        <code {...rest} />
      </Text>
    );
  },
  figure: (props) => (
    <Box asChild my="5">
      <figure {...props} />
    </Box>
  ),
  figcaption: (props) => (
    <Heading asChild mb="2" mx="3" size="2">
      <figcaption {...props} />
    </Heading>
  ),
  pre: ({ tabIndex: _, children, ...props }) => (
    <Card>
      <Inset>
        <ScrollArea>
          <pre {...props}>
            {children}
            <CopyCodeButton className="absolute right-[12px] top-[14px]" />
          </pre>
        </ScrollArea>
      </Inset>
    </Card>
  ),
  div: (props) => {
    const callout = props.className?.includes('markdown-alert');
    if (callout) {
      const { color, Icon } = getCalloutSeverity(props) ?? {};
      const message = (props.children as unknown[]).filter(
        isValidElement<PropsWithChildren>,
      )[1]?.props.children;

      return (
        <Callout.Root color={color} size="3">
          <Callout.Icon>{Icon ? <Icon size={20} /> : null}</Callout.Icon>
          <Callout.Text>{message}</Callout.Text>
        </Callout.Root>
      );
    }

    return <div {...props} />;
  },
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
            remarkPlugins: [remarkAlert],
          },
        }}
      />
    ) : null}
  </Section>
);
