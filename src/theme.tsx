import { type Theme, extendTheme } from '@mui/joy';
import { type PaletteOptions } from '@mui/joy/styles/types';
import { type Interpolation } from '@mui/styled-engine';
import { Check } from 'lucide-react';
import { Geist, Geist_Mono as GeistMono } from 'next/font/google';
import { type PartialDeep } from 'type-fest';

const geist = Geist({ subsets: ['latin'] });
const geistMono = GeistMono({ subsets: ['latin'], preload: false });

declare module '@mui/joy/styles/types/zIndex' {
  interface ZIndexOverrides {
    header: true;
  }
}

const palette = {
  common: { black: '#09090B' },
} satisfies PartialDeep<PaletteOptions>;

export const theme = extendTheme({
  colorSchemes: {
    light: { palette },
    dark: { palette },
  },
  fontFamily: {
    body: geist.style.fontFamily,
    display: geist.style.fontFamily,
    code: geistMono.style.fontFamily,
  },
  zIndex: {
    header: 1100,
  },
  components: {
    JoyCheckbox: {
      defaultProps: {
        checkedIcon: <Check />,
      },
      styleOverrides: {
        root: {
          WebkitTapHighlightColor: 'transparent',
        },
      },
    },
    JoyChip: {
      styleOverrides: {
        root: {
          WebkitTapHighlightColor: 'transparent',
        },
      },
    },
    JoyLink: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          display:
            !ownerState.startDecorator && !ownerState.endDecorator
              ? 'inline'
              : undefined,
        }),
      },
    },
    JoyStack: {
      defaultProps: { useFlexGap: true },
    },
  },
});

export const globalStyles = (theme: Theme) => {
  const iconStyle = {
    color: 'var(--Icon-color, var(--joy-palette-text-icon))',
    margin: 'var(--Icon-margin)',
    fontSize: 'var(--Icon-fontSize, 1.5rem)',
    width: '1em',
    height: '1em',
  };

  return {
    ':root': {
      '--Section-paddingY': theme.spacing(10),
      '--Footer-paddingY': theme.spacing(6),
      '--Footer-bg': theme.vars.palette.background.surface,
      '--Header-height': '64px',
    },
    '::selection': {
      backgroundColor: theme.vars.palette.primary.softBg,
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100svh',
    },
    code: {
      font: theme.vars.font['body-sm'],
      fontFamily: theme.vars.fontFamily.code,
      color: 'inherit',
      '&[data-theme*=" "], &[data-theme*=" "] span': {
        color: 'var(--shiki-light)',
        backgroundColor: 'var(--shiki-light-bg)',
        [theme.getColorSchemeSelector('dark')]: {
          color: 'var(--shiki-dark)',
          backgroundColor: 'var(--shiki-dark-bg)',
        },
      },
    },
    figure: { margin: 0 },
    footer: {
      paddingBlock: 'var(--Footer-paddingY)',
      backgroundColor: 'var(--Footer-bg)',
    },
    img: { objectFit: 'cover', display: 'block' },
    input: {
      '&[type="search"]': {
        '&::-webkit-search-decoration, ::-webkit-search-cancel-button, ::-webkit-search-results-button, ::-webkit-search-results-decoration':
          {
            WebkitAppearance: 'none',
          },
      },
    },
    main: { flex: 1 },
    section: { paddingBlock: 'var(--Section-paddingY)' },
    svg: { display: 'block' },
    '.lucide': iconStyle,
    '.si': { ...iconStyle, padding: '0.083em' },
  } satisfies Interpolation<Theme>;
};
