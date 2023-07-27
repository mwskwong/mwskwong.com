import { PaletteRange, extendTheme } from "@mui/joy";
import { Rubik, Source_Code_Pro } from "next/font/google";

declare module "@mui/joy/styles/types/zIndex" {
  interface ZIndexOverrides {
    header: true;
  }
}

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    info: true;
  }

  interface Palette {
    info: PaletteRange;
  }
}

const rubik = Rubik({ subsets: ["latin"] });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

const info = {
  50: "#FDF7FF",
  100: "#F4EAFF",
  200: "#E1CBFF",
  300: "#C69EFF",
  400: "#A374F9",
  500: "#814DDE",
  600: "#5F35AE",
  700: "#452382",
  800: "#301761",
  900: "#1D0A42",
};

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        info: {
          ...info,
          plainColor: "var(--joy-palette-info-600)",
          plainHoverBg: "var(--joy-palette-info-100)",
          plainActiveBg: "var(--joy-palette-info-200)",
          plainDisabledColor: "var(--joy-palette-info-200)",
          outlinedColor: "var(--joy-palette-info-500)",
          outlinedBorder: "var(--joy-palette-info-200)",
          outlinedHoverBg: "var(--joy-palette-info-100)",
          outlinedHoverBorder: "var(--joy-palette-info-300)",
          outlinedActiveBg: "var(--joy-palette-info-200)",
          outlinedDisabledColor: "var(--joy-palette-info-100)",
          outlinedDisabledBorder: "var(--joy-palette-info-100)",
          softColor: "var(--joy-palette-info-600)",
          softBg: "var(--joy-palette-info-100)",
          softHoverBg: "var(--joy-palette-info-200)",
          softActiveBg: "var(--joy-palette-info-300)",
          softDisabledColor: "var(--joy-palette-info-300)",
          softDisabledBg: "var(--joy-paletteinfo}-50)",
          solidColor: "#fff",
          solidBg: "var(--joy-palette-info-500)",
          solidHoverBg: "var(--joy-palette-info-600)",
          solidActiveBg: "var(--joy-palette-info-700)",
          solidDisabledColor: "#fff",
          solidDisabledBg: "var(--joy-palette-info-200)",
        },
      },
    },
    dark: {
      palette: {
        info: {
          ...info,
          plainColor: "var(--joy-palette-info-300)",
          plainHoverBg: "var(--joy-palette-info-800)",
          plainActiveBg: "var(--joy-palette-info-700)",
          plainDisabledColor: "var(--joy-palette-info-800)",
          outlinedColor: "var(--joy-palette-info-200)",
          outlinedBorder: "var(--joy-palette-info-700)",
          outlinedHoverBg: "var(--joy-palette-info-800)",
          outlinedHoverBorder: "var(--joy-palette-info-600)",
          outlinedActiveBg: "var(--joy-palette-info-900)",
          outlinedDisabledColor: "var(--joy-palette-info-800)",
          outlinedDisabledBorder: "var(--joy-palette-info-800)",
          softColor: "var(--joy-palette-info-200)",
          softBg: "var(--joy-palette-info-900)",
          softHoverBg: "var(--joy-palette-info-800)",
          softActiveBg: "var(--joy-palette-info-700)",
          softDisabledColor: "var(--joy-palette-info-800)",
          softDisabledBg: "var(--joy-palette-info-900)",
          solidColor: "#fff",
          solidBg: "var(--joy-palette-info-600)",
          solidHoverBg: "var(--joy-palette-info-700)",
          solidActiveBg: "var(--joy-palette-info-800)",
          solidDisabledColor: "var(--joy-palette-info-700)",
          solidDisabledBg: "var(--joy-palette-info-900)",
        },
      },
    },
  },
  fontFamily: {
    body: rubik.style.fontFamily,
    display: rubik.style.fontFamily,
    code: sourceCodePro.style.fontFamily,
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
