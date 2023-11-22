import { Theme, extendTheme } from '@mui/joy/styles';
import { Interpolation } from '@mui/styled-engine';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

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

export const theme = extendTheme({
  fontFamily: {
    body: GeistSans.style.fontFamily,
    display: GeistSans.style.fontFamily,
    code: GeistMono.style.fontFamily,
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
      '--Header-offset': '56px',
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
        // attempting to match simple icons
        // lucide icons already effectively have padding surrounding the path
        // according to the current design of the icons
        '&:not(.lucide)': { padding: `${(2 / 24).toFixed(5)}em` },
      },
    },
  }) satisfies Interpolation<Theme>;
