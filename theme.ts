import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  fontFamily: {
    body: "var(--font-rubik), var(--joy-fontFamily-fallback)",
    display: "var(--font-rubik), var(--joy-fontFamily-fallback)",
    code: "var(--font-source-code-pro)",
  },
  components: {
    JoyCard: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          boxShadow: ownerState.variant === "outlined" ? "none" : undefined,
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

export const simpleIconsClasses = { root: "SimpleIcons-root" };
export default theme;
