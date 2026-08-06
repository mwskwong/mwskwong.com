import { defineConfig } from "oxfmt";

const oxfmtConfig = defineConfig({
  sortImports: true,
  sortTailwindcss: {
    stylesheet: "./src/app/globals.css",
    functions: ["cn"],
  },
  sortPackageJson: { sortScripts: true },
});

export default oxfmtConfig;
