import { extendTheme } from "@mui/joy/styles";
import { Rubik, Source_Code_Pro } from "next/font/google";

declare module "@mui/joy/styles/types/zIndex" {
  interface ZIndexOverrides {
    header: true;
  }
}

declare module "@mui/joy/styles" {
  interface FontSizeOverrides {
    xl7: true;
    xl6: true;
    xl5: true;
  }
}

declare module "@mui/joy/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    branding: true;
  }
}

const rubik = Rubik({ subsets: ["latin"] });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
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
  fontSize: {
    xl7: "4.5rem",
    xl6: "3.75rem",
    xl5: "3rem",
  },
  zIndex: {
    header: 1100,
  },
  components: {
    JoyLink: {
      styleOverrides: {
        root: {
          userSelect: "unset",
          // WORKAROUND: to ensure the overlay is always on top of everything
          "&::after": { zIndex: 1 },
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
