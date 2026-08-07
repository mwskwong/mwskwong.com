import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

const oxfmtConfig = defineConfig({
  ...ultracite,
  sortTailwindcss: {
    stylesheet: "./src/app/globals.css",
    functions: ["cn"],
  },
});

export default oxfmtConfig;
