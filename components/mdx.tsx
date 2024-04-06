import {
  Box,
  Link,
  List,
  ListItem,
  Sheet,
  Typography,
  TypographyProps,
} from '@mui/joy';
import { merge } from 'lodash-es';
import { LinkIcon } from 'lucide-react';
import { MDXComponents } from 'mdx/types';
import NextLink from 'next/link';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { FC, RefObject } from 'react';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

import { CopyCodeButton } from './copy-code-button';

// data attribute auto injected by rehype-pretty-code
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-language'?: string;
    'data-rehype-pretty-code-figure'?: '';
    'data-rehype-pretty-code-title'?: '';
    'data-highlighted-chars'?: '';
  }
}

const Heading: FC<TypographyProps> = ({ id, children, ...props }) => (
  <Typography id={id} {...props}>
    <Link
      color="neutral"
      endDecorator={<LinkIcon />}
      href={id ? `#${id}` : undefined}
      slotProps={{
        endDecorator: {
          sx: {
            display: { xs: 'none', md: 'unset' },
            visibility: 'hidden',
            '--Icon-fontSize': 'var(--joy-fontSize-xl)',
            '--Icon-color': 'var(--joy-palette-text-icon)',
          },
        },
      }}
      sx={{
        color: 'inherit',
        '&:hover': {
          '& .MuiLink-endDecorator': {
            visibility: 'unset',
          },
        },
      }}
    >
      {children}
    </Link>
  </Typography>
);

export const components = {
  h2: ({ ref, color, ...props }) => (
    <Heading
      ref={ref as RefObject<HTMLHeadingElement>}
      level="h2"
      sx={{
        mb: 3,
        mt: 6,
        color,
        scrollMarginTop: 'calc(var(--Header-height) + 6 * var(--joy-spacing))',
      }}
      {...props}
    />
  ),
  h3: ({ ref, color, ...props }) => (
    <Heading
      ref={ref as RefObject<HTMLHeadingElement>}
      level="h3"
      sx={{
        mb: 1.5,
        mt: 4,
        color,
        scrollMarginTop: 'calc(var(--Header-height) + 4 * var(--joy-spacing))',
      }}
      {...props}
    />
  ),
  h4: ({ ref, color, ...props }) => (
    <Heading
      ref={ref as RefObject<HTMLHeadingElement>}
      level="h4"
      sx={{
        mb: 1,
        mt: 3,
        color,
        scrollMarginTop: 'calc(var(--Header-height) + 3 * var(--joy-spacing))',
      }}
      {...props}
    />
  ),
  p: ({ ref, color, ...props }) => (
    <Typography
      ref={ref as RefObject<HTMLParagraphElement>}
      sx={{ my: 2, color }}
      {...props}
    />
  ),
  a: ({ ref, color, children, ...props }) => {
    const external =
      props.href?.startsWith('http://') ?? props.href?.startsWith('https://');
    return (
      <Link
        ref={ref as RefObject<HTMLAnchorElement>}
        component={external ? 'a' : NextLink}
        sx={{ color, '& > code': { color: 'inherit' } }}
        target={external ? '_blank' : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  },
  ul: ({ ref, color, ...props }) => (
    <List
      ref={ref as RefObject<HTMLUListElement>}
      component="ul"
      marker="disc"
      sx={{
        color,
        my: 2,
        '--List-padding': '0px',
        '& ul > li': {
          '--_List-markerType': 'circle',
        },
      }}
      {...props}
    />
  ),
  ol: ({ ref, color, ...props }) => (
    <List
      ref={ref as RefObject<HTMLOListElement>}
      component="ol"
      marker="decimal"
      sx={{ color, my: 2, '--List-padding': '0px' }}
      {...props}
    />
  ),
  li: ({ ref, color, ...props }) => (
    <ListItem
      ref={ref as RefObject<HTMLLIElement>}
      sx={{
        color,
        // handle <p>, which has margin by default, nested in <li>
        '& :first-child': { mt: 0 },
        '& :last-child': { mb: 0 },
      }}
      {...props}
    />
  ),
  figure: (props) => {
    if (props['data-rehype-pretty-code-figure'] === '') {
      const { ref, color, children, ...rest } = props;
      return (
        <Sheet
          ref={ref as RefObject<HTMLElement>}
          component="figure"
          variant="outlined"
          sx={{
            color,
            borderRadius: 'md',
            my: 2,
            overflow: 'hidden',
          }}
          {...rest}
        >
          <CopyCodeButton
            size="sm"
            variant="outlined"
            sx={{
              position: 'absolute',
              top: 10.5,
              right: 10.5,
              bgcolor: 'inherit',
            }}
          />
          {children}
        </Sheet>
      );
    }
    return <figure {...props} />;
  },
  figcaption: (props) => {
    if (props['data-rehype-pretty-code-title'] === '') {
      const { ref, color, ...rest } = props;
      return (
        <Typography
          ref={ref as RefObject<HTMLElement>}
          component="figcaption"
          level="body-sm"
          sx={{ pt: 2, textAlign: 'center', color }}
          {...rest}
        />
      );
    }
    return <figcaption {...props} />;
  },
  pre: ({ ref, ...props }) => (
    <Box
      ref={ref as RefObject<HTMLPreElement>}
      component="pre"
      sx={{ m: 0, overflow: 'auto', py: 2 }}
      {...props}
    />
  ),
  code: (props) => {
    const inlineCode = props.style === undefined;

    if (inlineCode) {
      const { ref, color, ...rest } = props;
      return (
        <Typography
          ref={ref as RefObject<HTMLElement>}
          noWrap
          color="warning"
          component="code"
          variant="plain"
          sx={{
            display: 'inline',
            fontFamily: 'code',
            fontSize: '0.875em',
            mx: 0,
            color,
          }}
          {...rest}
        />
      );
    }

    return <code {...props} />;
  },
  span: ({ ref, ...props }) => (
    <Box
      ref={ref as RefObject<HTMLSpanElement>}
      component="span"
      sx={{
        // match code block
        '[data-rehype-pretty-code-figure] &': {
          '&[data-line]': { px: 2 },
          '&[data-highlighted-line]': {
            bgcolor: 'neutral.softBg',
          },
        },
        // if code block doesn't have a title, increase padding-right
        // to prevent the copy button from covering the code
        '[data-rehype-pretty-code-figure] :not([data-rehype-pretty-code-title]) + pre &':
          {
            '&[data-line]': { pr: `calc(var(--joy-spacing) + ${32 + 10.5}px)` },
          },
      }}
      {...props}
    />
  ),
  mark: (props) => {
    if (props['data-highlighted-chars'] === '') {
      const { ref, color, ...rest } = props;
      return (
        <Typography
          ref={ref as RefObject<HTMLElement>}
          component="mark"
          sx={{ color }}
          variant="soft"
          {...rest}
        />
      );
    }

    return <mark {...props} />;
  },
} satisfies MDXComponents;

export type MdxProps = MDXRemoteProps;
export const Mdx: FC<MdxProps> = ({
  components: componentsProp,
  options,
  ...props
}) => (
  <MDXRemote
    components={{ ...components, ...componentsProp }}
    options={merge(
      {
        mdxOptions: {
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: {
                  dark: 'github-dark-default',
                  light: 'github-light-default',
                },
                keepBackground: false,
                defaultLang: { block: 'ansi' },
              } satisfies Options,
            ],
            rehypeSlug,
          ],
        },
      },
      options,
    )}
    {...props}
  />
);
