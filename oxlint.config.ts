import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

const oxlintConfig = defineConfig({
  extends: [core, react, next],
  rules: {
    "sort-keys": "off",
    "import/consistent-type-specifier-style": [
      "error",
      "prefer-top-level-if-only-type-imports",
    ],
  },
  settings: {
    "jsx-a11y": {
      components: {
        Button: "button",
        Image: "img",
        Link: "a",
      },
    },
    react: { linkComponents: ["Link"] },
  },
  ignorePatterns: core.ignorePatterns ?? [],
});

export default oxlintConfig;
