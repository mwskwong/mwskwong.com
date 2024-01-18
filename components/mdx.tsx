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
import { mergeSx } from 'merge-sx';
import NextLink from 'next/link';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { FC, RefObject } from 'react';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

const Heading: FC<TypographyProps> = ({
  id,
  slotProps,
  sx,
  children,
  ...props
}) => (
  <Typography
    endDecorator={<LinkIcon />}
    id={id}
    slotProps={merge(
      {
        endDecorator: {
          sx: {
            display: { xs: 'none', md: 'unset' },
            visibility: 'hidden',
            '--Icon-fontSize': 'var(--joy-fontSize-xl)',
          },
        },
      },
      slotProps,
    )}
    sx={mergeSx(
      {
        '&:hover': {
          '& .MuiTypography-endDecorator': {
            visibility: 'unset',
          },
        },
      },
      sx,
    )}
    {...props}
  >
    <Link color="neutral" href={`#${id}`} textColor="inherit">
      {children}
    </Link>
  </Typography>
);

export const components = {
  h2: ({ ref, color, ...props }) => (
    <Heading
      level="h2"
      mb={3}
      mt={6}
      ref={ref as RefObject<HTMLHeadingElement>}
      sx={{
        scrollMarginTop: 'calc(var(--Header-height) + 8px * 6)',
      }}
      textColor={color}
      {...props}
    />
  ),
  h3: ({ ref, color, ...props }) => (
    <Heading
      level="h3"
      mb={1.5}
      mt={4}
      ref={ref as RefObject<HTMLHeadingElement>}
      sx={{
        scrollMarginTop: 'calc(var(--Header-height) + 8px * 4)',
      }}
      textColor={color}
      {...props}
    />
  ),
  h4: ({ ref, color, ...props }) => (
    <Heading
      level="h4"
      mb={1}
      mt={3}
      ref={ref as RefObject<HTMLHeadingElement>}
      sx={{
        scrollMarginTop: 'calc(var(--Header-height) + 8px * 3)',
      }}
      textColor={color}
      {...props}
    />
  ),
  p: ({ ref, color, ...props }) => (
    <Typography
      my={2}
      ref={ref as RefObject<HTMLParagraphElement>}
      textColor={color}
      {...props}
    />
  ),
  a: ({ ref, color, children, ...props }) => {
    const external =
      props.href?.startsWith('http://') || props.href?.startsWith('https://');
    return (
      <Link
        component={external ? 'a' : NextLink}
        ref={ref as RefObject<HTMLAnchorElement>}
        sx={{ '& > code': { color: 'inherit' } }}
        target={external ? '_blank' : undefined}
        textColor={color}
        underline="always"
        {...props}
      >
        {children}
      </Link>
    );
  },
  ul: ({ ref, color, ...props }) => (
    <List
      component="ul"
      marker="disc"
      ref={ref as RefObject<HTMLUListElement>}
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
      component="ol"
      marker="decimal"
      ref={ref as RefObject<HTMLOListElement>}
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
      const { ref, color, ...rest } = props;
      return (
        <Sheet
          component="figure"
          ref={ref as RefObject<HTMLElement>}
          sx={{
            color,
            borderRadius: 'md',
            my: 2,
            overflow: 'hidden',
          }}
          variant="outlined"
          {...rest}
        />
      );
    }
    return <figure {...props} />;
  },
  figcaption: (props) => {
    if (props['data-rehype-pretty-code-title'] === '') {
      const { ref, color, ...rest } = props;
      return (
        <Typography
          component="figcaption"
          level="body-sm"
          pt={2}
          ref={ref as RefObject<HTMLElement>}
          textAlign="center"
          textColor={color}
          {...rest}
        />
      );
    }
    return <figcaption {...props} />;
  },
  pre: ({ ref, ...props }) => (
    <Box
      component="pre"
      m={0}
      overflow="auto"
      py={2}
      ref={ref as RefObject<HTMLPreElement>}
      {...props}
    />
  ),
  code: (props) => {
    const inlineCode = props.style === undefined;

    if (inlineCode) {
      const { ref, color, ...rest } = props;
      return (
        <Typography
          color="warning"
          component="code"
          display="inline"
          fontFamily="code"
          fontSize="0.875em"
          mx={0}
          noWrap
          ref={ref as RefObject<HTMLElement>}
          textColor={color}
          variant="plain"
          {...rest}
        />
      );
    }

    return <code {...props} />;
  },
  span: ({ ref, ...props }) => (
    <Box
      component="span"
      ref={ref as RefObject<HTMLSpanElement>}
      sx={{
        // match code block
        '[data-rehype-pretty-code-figure] &': {
          '&[data-line]': { px: 2 },
          '&[data-highlighted-line]': {
            bgcolor: 'neutral.softBg',
          },
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
          component="mark"
          ref={ref as RefObject<HTMLElement>}
          textColor={color}
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
                  dark: 'dark-plus',
                  light: 'light-plus',
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
