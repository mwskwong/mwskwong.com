import { extendTheme } from "@mui/joy";

declare module "@mui/joy/styles/types/zIndex" {
  interface ZIndexOverrides {
    header: true;
  }
}

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: "var(--joy-palette-common-black)",
          surface: "var(--joy-palette-neutral-900)",
          popup: "var(--joy-palette-neutral-900)",
          level1: "var(--joy-palette-neutral-900)",
          level2: "var(--joy-palette-neutral-800)",
          level3: "var(--joy-palette-neutral-700)",
          tooltip: "var(--joy-palette-neutral-700)",
        },
      },
    },
  },
  fontFamily: {
    body: "var(--font-rubik), var(--joy-fontFamily-fallback)",
    display: "var(--font-rubik), var(--joy-fontFamily-fallback)",
    code: "var(--font-source-code-pro)",
  },
  zIndex: {
    header: 1100,
  },
  components: {
    JoyLink: {
      styleOverrides: {
        root: {
          userSelect: "unset",
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

export default theme;
