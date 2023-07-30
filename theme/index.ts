import { extendTheme } from "@mui/joy";
import { Rubik, Source_Code_Pro } from "next/font/google";

declare module "@mui/joy/styles/types/zIndex" {
  interface ZIndexOverrides {
    header: true;
  }
}

const primary = {
  50: "#F4FAFF",
  100: "#DDF1FF",
  200: "#ADDBFF",
  300: "#6FB6FF",
  400: "#3990FF",
  500: "#096BDE",
  600: "#054DA7",
  700: "#02367D",
  800: "#072859",
  900: "#00153C",
};

const rubik = Rubik({ subsets: ["latin"] });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          ...primary,
          plainColor: `var(--joy-palette-primary-600)`,
          plainHoverBg: `var(--joy-palette-primary-100)`,
          plainActiveBg: `var(--joy-palette-primary-200)`,
          plainDisabledColor: `var(--joy-palette-primary-200)`,

          outlinedColor: `var(--joy-palette-primary-500)`,
          outlinedBorder: `var(--joy-palette-primary-200)`,
          outlinedHoverBg: `var(--joy-palette-primary-100)`,
          outlinedHoverBorder: `var(--joy-palette-primary-300)`,
          outlinedActiveBg: `var(--joy-palette-primary-200)`,
          outlinedDisabledColor: `var(--joy-palette-primary-100)`,
          outlinedDisabledBorder: `var(--joy-palette-primary-100)`,

          softColor: `var(--joy-palette-primary-600)`,
          softBg: `var(--joy-palette-primary-100)`,
          softHoverBg: `var(--joy-palette-primary-200)`,
          softActiveBg: `var(--joy-palette-primary-300)`,
          softDisabledColor: `var(--joy-palette-primary-300)`,
          softDisabledBg: `var(--joy-palette-primary}-)50`,
          solidColor: "var(--joy-palette-common-white)",

          solidBg: `var(--joy-palette-primary-500)`,
          solidHoverBg: `var(--joy-palette-primary-600)`,
          solidActiveBg: `var(--joy-palette-primary-700)`,
          solidDisabledColor: "var(--joy-palette-common-white)",
          solidDisabledBg: `var(--joy-palette-primary-200)`,
        },
        background: {
          body: "var(--joy-palette-common-white)",
          level1: "var(--joy-palette-neutral-50)",
          level2: "var(--joy-palette-neutral-100)",
          level3: "var(--joy-palette-neutral-200)",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          ...primary,
          plainColor: `var(--joy-palette-primary-300)`,
          plainHoverBg: `var(--joy-palette-primary-800)`,
          plainActiveBg: `var(--joy-palette-primary-700)`,
          plainDisabledColor: `var(--joy-palette-primary-800)`,

          outlinedColor: `var(--joy-palette-primary-200)`,
          outlinedBorder: `var(--joy-palette-primary-700)`,
          outlinedHoverBg: `var(--joy-palette-primary-800)`,
          outlinedHoverBorder: `var(--joy-palette-primary-600)`,
          outlinedActiveBg: `var(--joy-palette-primary-900)`,
          outlinedDisabledColor: `var(--joy-palette-primary-800)`,
          outlinedDisabledBorder: `var(--joy-palette-primary-800)`,

          softColor: `var(--joy-palette-primary-200)`,
          softBg: `var(--joy-palette-primary-900)`,
          softHoverBg: `var(--joy-palette-primary-800)`,
          softActiveBg: `var(--joy-palette-primary-700)`,
          softDisabledColor: `var(--joy-palette-primary-800)`,
          softDisabledBg: `var(--joy-palette-primary-900)`,

          solidColor: "var(--joy-palette-common-white)",
          solidBg: `var(--joy-palette-primary-600)`,
          solidHoverBg: `var(--joy-palette-primary-700)`,
          solidActiveBg: `var(--joy-palette-primary-800)`,
          solidDisabledColor: `var(--joy-palette-primary-700)`,
          solidDisabledBg: `var(--joy-palette-primary-900)`,
        },
        background: {
          level1: "var(--joy-palette-neutral-900)",
          level2: "var(--joy-palette-neutral-800)",
          level3: "var(--joy-palette-neutral-700)",
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
