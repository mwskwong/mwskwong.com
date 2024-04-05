import { Theme, extendTheme } from '@mui/joy';
import { PaletteOptions } from '@mui/joy/styles/types';
import { Interpolation } from '@mui/styled-engine';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { PartialDeep } from 'type-fest';

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
    body: GeistSans.style.fontFamily,
    display: GeistSans.style.fontFamily,
    code: GeistMono.style.fontFamily,
  },
  zIndex: {
    header: 1100,
  },
  components: {
    JoyCheckbox: {
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

export const globalStyles = (theme: Theme) =>
  ({
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
      minHeight: '100dvh',
    },
    code: {
      ...theme.typography['body-sm'],
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
    img: { objectFit: 'cover' },
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
    svg: {
      display: 'block',
      // match icons, the 2nd one is for Simple Icons with modified view box
      // such that the icon will appears to have the same size as Lucide icons
      '&[viewBox="0 0 24 24"], &[viewBox="-2 -2 28 28"]': {
        color: 'var(--Icon-color, var(--joy-palette-text-icon))',
        margin: 'var(--Icon-margin)',
        fontSize: 'var(--Icon-fontSize, 1.5rem)',
        width: '1em',
        height: '1em',
        flexShrink: 0,
      },
    },
  }) satisfies Interpolation<Theme>;
