import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

const oxlintConfig = defineConfig({
  extends: [core, react, next, antiSlop],
  rules: {
    "sort-keys": "off",
    "import/consistent-type-specifier-style": [
      "error",
      "prefer-top-level-if-only-type-imports",
    ],
    "typescript/strict-boolean-expressions": "off",
  },
  options: { typeAware: true, typeCheck: true },
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
