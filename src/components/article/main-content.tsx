import "@radix-ui/themes/tokens/colors/amber.css";
import "@radix-ui/themes/tokens/colors/blue.css";
import "@radix-ui/themes/tokens/colors/red.css";

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
} from "@radix-ui/themes";
// compound component needs to be imported from individual entry point to avoid the entire @radix-ui/themes being bundled in the client bundle
import * as Callout from "@radix-ui/themes/components/callout";
import {
  IconAlertTriangle,
  IconExclamationCircle,
  IconInfoCircle,
} from "@tabler/icons-react";
import { clsx } from "clsx";
import { type MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import NextLink from "next/link";
import {
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
  isValidElement,
} from "react";
import { type Options, rehypePrettyCode } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { remarkAlert } from "remark-github-blockquote-alert";

import { containerMaxWidth, md } from "@/constants/site-config";
import { type getArticleBySlug } from "@/lib/queries";
import { dateFormatter } from "@/lib/utils";

import { CopyCodeButton } from "./copy-code-button";
import styles from "./main-content.module.css";

const getCalloutSeverity = ({ className }: HTMLAttributes<HTMLElement>) => {
  if (className?.includes("markdown-alert-note")) {
    return { color: "blue", Icon: IconInfoCircle } as const;
  }

  if (className?.includes("markdown-alert-warning")) {
    return { color: "amber", Icon: IconAlertTriangle } as const;
  }

  if (className?.includes("markdown-alert-caution")) {
    return { color: "red", Icon: IconExclamationCircle } as const;
  }
};

const components = {
  h2: ({ children, id, color, ...properties }) => (
    <Heading as="h2" id={id} mb="3" mt="8" size="6" {...properties}>
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
  h3: ({ children, id, color, ...properties }) => (
    <Heading as="h3" id={id} mb="2" mt="7" size="4" {...properties}>
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
  h4: ({ children, id, color, ...properties }) => (
    <Heading as="h4" id={id} mb="2" mt="6" size="3" {...properties}>
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
  p: ({ color, ...properties }) => (
    <Text as="p" mb="4" style={{ color }} {...properties} />
  ),
  a: ({ color, href = "", children, ...properties }) => {
    const internal = href.startsWith("/");

    return (
      <Link
        asChild={internal}
        href={internal ? undefined : href}
        rel={internal ? undefined : "noopener"}
        style={{ color }}
        target={internal ? undefined : "_blank"}
        {...properties}
      >
        {internal ? <NextLink href={href}>{children}</NextLink> : children}
      </Link>
    );
  },
  strong: Strong,
  ul: ({ className, ...properties }) => (
    <Box asChild my="4" pl="20px">
      <ul className={clsx(styles.list, className)} {...properties} />
    </Box>
  ),
  ol: ({ className, ...properties }) => (
    <Box asChild my="4" pl="20px">
      <ol className={clsx(styles.list, className)} {...properties} />
    </Box>
  ),
  code: (properties) => {
    const inlineCode = properties.style === undefined;
    if (inlineCode) {
      const { color, ...rest } = properties;
      return <Code color="indigo" style={{ color }} {...rest} />;
    }

    const { className, ...rest } = properties;
    return (
      <Text asChild className={clsx(styles.code, className)} size="2">
        <code {...rest} />
      </Text>
    );
  },
  figure: (properties) => (
    <Box asChild my="5">
      <figure {...properties} />
    </Box>
  ),
  figcaption: (properties) => (
    <Heading asChild mb="2" mx="3" size="2">
      <figcaption {...properties} />
    </Heading>
  ),
  pre: ({ tabIndex: _, children, ...properties }) => (
    <Card>
      <Inset>
        <ScrollArea>
          <pre {...properties}>
            {children}
            <CopyCodeButton className={styles.copyCodeButton} />
          </pre>
        </ScrollArea>
      </Inset>
    </Card>
  ),
  div: (properties) => {
    const callout = properties.className?.includes("markdown-alert");
    if (callout) {
      const { color, Icon } = getCalloutSeverity(properties) ?? {};
      const message = (properties.children as unknown[]).filter((child) =>
        isValidElement<PropsWithChildren>(child),
      )[1]?.props.children;

      return (
        <Callout.Root color={color} size="3">
          <Callout.Icon>{Icon && <Icon size={20} />}</Callout.Icon>
          <Callout.Text>{message}</Callout.Text>
        </Callout.Root>
      );
    }

    return <div {...properties} />;
  },
} satisfies MDXComponents;

export interface MainContentProperties extends Omit<SectionProps, "children"> {
  article: NonNullable<Awaited<ReturnType<typeof getArticleBySlug>>>;
}

export const MainContent: FC<MainContentProperties> = ({
  article,
  ...properties
}) => (
  <Section {...properties}>
    <Flex direction="column" gap="5">
      <Text color="gray">
        {dateFormatter.format(new Date(article.createdAt))}
      </Text>
      <Heading size="8">{article.title}</Heading>
      <Text size="4">{article.description}</Text>
    </Flex>
    {article.coverPhoto && (
      <Box
        className={styles.coverPhotoContainer}
        my="8"
        overflow="hidden"
        position="relative"
      >
        <Image
          fill
          priority
          alt={article.title}
          src={article.coverPhoto}
          sizes={[
            `(min-width: ${containerMaxWidth}px) ${containerMaxWidth - 350}px`, // 350px is the side bar width
            `(min-width: ${md}px) calc(100vw - 350px)`,
            "100vw",
          ].join(",")}
        />
      </Box>
    )}
    {article.content && (
      <MDXRemote
        components={components}
        source={article.content}
        options={{
          mdxOptions: {
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: "github-light-default",
                  keepBackground: false,
                } satisfies Options,
              ],
              rehypeSlug,
            ],
            remarkPlugins: [remarkAlert],
          },
        }}
      />
    )}
  </Section>
);
