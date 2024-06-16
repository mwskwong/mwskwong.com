import {
  Box,
  Link,
  List,
  ListItem,
  Sheet,
  Typography,
  type TypographyProps,
} from '@mui/joy';
import { merge } from 'lodash-es';
import { LinkIcon } from 'lucide-react';
import { type MDXComponents } from 'mdx/types';
import NextLink from 'next/link';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { type FC } from 'react';
import { type Options, rehypePrettyCode } from 'rehype-pretty-code';
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
  h2: ({ color, ...props }) => (
    <Heading
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
  h3: ({ color, ...props }) => (
    <Heading
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
  h4: ({ color, ...props }) => (
    <Heading
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
  p: ({ color, ...props }) => <Typography sx={{ my: 2, color }} {...props} />,
  a: ({ color, children, ...props }) => {
    const external = props.href
      ? props.href.startsWith('http://') || props.href.startsWith('https://')
      : false;
    return (
      <Link
        component={external ? 'a' : NextLink}
        sx={{ color, '& > code': { color: 'inherit' } }}
        target={external ? '_blank' : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  },
  ul: ({ color, ...props }) => (
    <List
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
  ol: ({ color, ...props }) => (
    <List
      component="ol"
      marker="decimal"
      sx={{ color, my: 2, '--List-padding': '0px' }}
      {...props}
    />
  ),
  li: ({ color, ...props }) => (
    <ListItem
      sx={{
        color,
        '& p:first-child': { mt: 0 },
        '& p:last-child': { mb: 0 },
      }}
      {...props}
    />
  ),
  figure: (props) => {
    if (props['data-rehype-pretty-code-figure'] === '') {
      const { color, children, ...rest } = props;
      return (
        <Sheet
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
      const { color, ...rest } = props;
      return (
        <Typography
          component="figcaption"
          level="body-sm"
          sx={{ pt: 2, textAlign: 'center', color }}
          {...rest}
        />
      );
    }
    return <figcaption {...props} />;
  },
  pre: ({ ...props }) => (
    <Box component="pre" sx={{ m: 0, overflow: 'auto', py: 2 }} {...props} />
  ),
  code: (props) => {
    const inlineCode = props.style === undefined;

    if (inlineCode) {
      const { color, ...rest } = props;
      return (
        <Typography
          component="code"
          variant="soft"
          sx={{
            display: 'inline',
            fontFamily: 'code',
            fontSize: '0.875em',
            color,
            marginInline: 'unset',
          }}
          {...rest}
        />
      );
    }

    return <code {...props} />;
  },
  span: ({ ...props }) => (
    <Box
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
      const { color, ...rest } = props;
      return (
        <Typography component="mark" sx={{ color }} variant="soft" {...rest} />
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
                defaultLang: { block: 'txt' },
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
