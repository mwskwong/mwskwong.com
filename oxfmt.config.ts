import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

const oxfmtConfig = defineConfig({
  ...ultracite,
  sortTailwindcss: {
    ...ultracite.sortTailwindcss,
    stylesheet: "./src/app/globals.css",
  },
});

export default oxfmtConfig;
