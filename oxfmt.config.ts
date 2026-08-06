import { defineConfig } from "oxfmt";

const oxfmtConfig = defineConfig({
  sortImports: {
    groups: [
      "type-import",
      ["value-builtin", "value-external"],
      "type-internal",
      "value-internal",
      ["type-parent", "type-sibling", "type-index"],
      ["value-parent", "value-sibling", "value-index"],
      "unknown",
    ],
  },
  sortTailwindcss: {
    stylesheet: "./src/app/globals.css",
    functions: ["cn"],
  },
});

export default oxfmtConfig;
