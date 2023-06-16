import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  fontFamily: {
    body: "var(--font-inter), var(--joy-fontFamily-fallback)",
    display: "var(--font-inter), var(--joy-fontFamily-fallback)",
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

export default theme;
