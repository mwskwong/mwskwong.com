import { Theme, extendTheme } from '@mui/joy/styles';
import { Interpolation } from '@mui/styled-engine';
import localFont from 'next/font/local';

declare module '@mui/joy/styles/types/zIndex' {
  interface ZIndexOverrides {
    header: true;
  }
}

declare module '@mui/joy/styles' {
  interface FontSizeOverrides {
    xl5: true;
  }
}

const geistSans = localFont({
  src: '../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2',
});

const geistMono = localFont({
  src: '../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2',
  adjustFontFallback: false,
  fallback: [
    'ui-monospace',
    'SFMono-Regular',
    'Roboto Mono',
    'Menlo',
    'Monaco',
    'Liberation Mono',
    'DejaVu Sans Mono',
    'Courier New',
    'monospace',
  ],
  preload: false,
});

export const theme = extendTheme({
  fontFamily: {
    body: geistSans.style.fontFamily,
    display: geistSans.style.fontFamily,
    code: geistMono.style.fontFamily,
  },
  fontSize: {
    xl5: '3rem',
  },
  zIndex: {
    header: 1100,
  },
  components: {
    JoyStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export const globalStyles = (theme: Theme) =>
  ({
    ':root': {
      '--Section-paddingY': theme.spacing(10),
      '--Footer-paddingY': theme.spacing(6),
      '--Footer-bg': theme.vars.palette.background.surface,
    },
    '::selection': {
      backgroundColor: theme.vars.palette.primary.solidBg,
      color: theme.vars.palette.primary.solidColor,
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100dvh',
    },
    code: {
      ...theme.typography['body-sm'],
      fontFamily: theme.vars.fontFamily.code,
    },
    footer: {
      paddingBlock: 'var(--Footer-paddingY)',
      backgroundColor: 'var(--Footer-bg)',
    },
    'h2, h3, h4': {
      // 56px is the offset for the fixed header
      scrollMarginTop: 'calc(56px + var(--Section-paddingY))',
    },
    img: { objectFit: 'cover' },
    main: { flex: 1 },
    section: { paddingBlock: 'var(--Section-paddingY)' },
    svg: {
      display: 'block',
      // match icons
      '&[viewBox="0 0 24 24"]': {
        color: 'var(--Icon-color, var(--joy-palette-text-icon))',
        margin: 'var(--Icon-margin)',
        fontSize: 'var(--Icon-fontSize, 1.5rem)',
        width: '1em',
        height: '1em',
        flexShrink: 0,
        // lucide icons already effectively have padding surrounding the path
        '&:not(.lucide)': { padding: `${(2 / 24).toFixed(5)}em` },
      },
    },
  }) satisfies Interpolation<Theme>;
