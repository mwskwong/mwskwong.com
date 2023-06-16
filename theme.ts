import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  fontFamily: {
    body: "var(--font-rubik), var(--joy-fontFamily-fallback)",
    display: "var(--font-rubik), var(--joy-fontFamily-fallback)",
    code: "var(--font-source-code-pro)",
  },
  components: {
    JoyStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export const simpleIconsClasses = { root: "SimpleIcons-root" };
export default theme;
