import { Theme, extendTheme } from '@mui/joy';
import { Interpolation } from '@mui/styled-engine';
// eslint-disable-next-line camelcase -- Next.js naming convention
import { Rubik, Source_Code_Pro } from 'next/font/google';

declare module '@mui/joy/styles/types/zIndex' {
  interface ZIndexOverrides {
    header: true;
    nprogress: true;
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
    header: 1100,
    nprogress: 2000,
  },
  components: {
    JoyLink: {
      styleOverrides: {
        root: {
          userSelect: 'unset',
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
        '--Header-height': '61px',
      },
      '--Section-paddingY': theme.spacing(10),
      '--Footer-paddingY': theme.spacing(6),
      '--Footer-bg': theme.vars.palette.background.surface,
      '--MaterialIcon-padding': `${(2 / 24).toFixed(5)}em`,
      '--Header-height': '60px',
      '--NProgress-height': '4px',
    },
    '::selection': {
      backgroundColor: theme.vars.palette.primary.solidBg,
      color: theme.vars.palette.primary.solidColor,
    },
    '#nprogress': {
      '& .bar': {
        zIndex: `var(--joy-zIndex-nprogress) !important`,
        borderRadius: 'var(--NProgress-height)',
        '& .peg': { display: 'none' },
      },
    },
    address: { fontStyle: 'unset' },
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
