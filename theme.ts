import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme(
  {
    fonts: {
      heading: "var(--font-rubik)",
      body: "var(--font-rubik)",
    },
  },
  withDefaultColorScheme({ colorScheme: "blue" })
);

export default theme;
