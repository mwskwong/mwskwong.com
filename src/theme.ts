import { Theme, extendTheme } from '@mui/joy';
import { Interpolation } from '@mui/styled-engine';
import { Rubik, Source_Code_Pro as SourceCodePro } from 'next/font/google';

declare module '@mui/joy/styles/types/zIndex' {
  interface ZIndexOverrides {
    header: true;
    nprogress: true;
  }
}

declare module '@mui/joy/styles' {
  interface FontSizeOverrides {
    xl5: true;
  }
}

declare module '@mui/joy/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    branding: true;
  }
}

const rubik = Rubik({ subsets: ['latin'] });
const sourceCodePro = SourceCodePro({
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
      '--Header-height': '57px',
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
