import { extendTheme } from "@mui/joy";
import { Rubik, Source_Code_Pro } from "next/font/google";

declare module "@mui/joy/styles/types/zIndex" {
  interface ZIndexOverrides {
    header: true;
  }
}

const rubik = Rubik({ subsets: ["latin"] });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });
const theme = extendTheme({
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
