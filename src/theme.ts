import { Theme, extendTheme } from '@mui/joy/styles';
import { Interpolation } from '@mui/styled-engine';
import { Rubik, Source_Code_Pro } from 'next/font/google';

declare module '@mui/joy/styles/types/zIndex' {
  interface ZIndexOverrides {
    header: true;
  }
}

declare module '@mui/joy/styles' {
  interface FontSizeOverrides {
    xl7: true;
    xl6: true;
    xl5: true;
  }
}

declare module '@mui/joy/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    branding: true;
  }
}

const rubik = Rubik({ subsets: ['latin'] });
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  adjustFontFallback: false,
  fallback: ['monospace'],
});

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: 'var(--joy-palette-common-white)',
          level1: 'var(--joy-palette-neutral-50)',
          level2: 'var(--joy-palette-neutral-100)',
          level3: 'var(--joy-palette-neutral-200)',
        },
      },
    },
    dark: {
      palette: {
        background: {
          level1: 'var(--joy-palette-neutral-900)',
          level2: 'var(--joy-palette-neutral-800)',
          level3: 'var(--joy-palette-neutral-700)',
        },
      },
    },
  },
  fontFamily: {
    body: rubik.style.fontFamily,
    display: rubik.style.fontFamily,
    code: sourceCodePro.style.fontFamily,
  },
  fontSize: {
    xl7: '4.5rem',
    xl6: '3.75rem',
    xl5: '3rem',
  },
  zIndex: {
    header: 1030,
  },
  components: {
    JoyLink: {
      styleOverrides: {
        root: {
          userSelect: 'unset',
          // WORKAROUND: to ensure the overlay is always on top of everything
          '&::after': { zIndex: 1 },
        },
      },
    },
    JoySheet: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          '& ::selection': {
            backgroundColor:
              ownerState.invertedColors && 'var(--variant-solidBg)',
            color: ownerState.invertedColors && 'var(--variant-solidColor)',
          },
        }),
      },
    },
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
      [theme.breakpoints.up('md')]: {
        '--Header-height': '65px',
      },
      '--Section-paddingY': theme.spacing(10),
      '--Footer-paddingY': theme.spacing(6),
      '--Footer-bg': theme.vars.palette.background.level1,
      '--MaterialIcon-padding': `${(2 / 24).toFixed(5)}em`,
      '--Header-height': '57px',
    },
    '::selection': {
      backgroundColor: theme.vars.palette.primary.solidBg,
      color: theme.vars.palette.primary.solidColor,
    },
    '#nprogress': {
      '& .bar': {
        borderRadius: '4px',
        '& .peg': { display: 'none' },
      },
    },
    address: { fontStyle: 'unset' },
    blockquote: {
      fontStyle: 'italic',
      '&::before': { content: "'“'" },
      '&::after': { content: "'”'" },
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    code: {
      ...theme.typography['body-sm'],
      fontFamily: theme.vars.fontFamily.code,
      color: 'inherit',
    },
    figure: { margin: 0 },
    footer: {
      paddingBlock: 'var(--Footer-paddingY)',
      backgroundColor: 'var(--Footer-bg)',
    },
    'h2, h3, h4': {
      scrollMarginTop: 'calc(var(--Header-height) + var(--Section-paddingY))',
    },
    main: { flex: 1 },
    section: { paddingBlock: 'var(--Section-paddingY)' },
    svg: { display: 'block' },
  }) satisfies Interpolation<Theme>;
