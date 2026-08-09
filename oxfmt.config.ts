import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

const oxfmtConfig = defineConfig({
  ...ultracite,
  sortTailwindcss: {
    functions: ["clsx", "cva", "tw", "twMerge", "cn", "twJoin", "tv"],
    stylesheet: "./src/app/globals.css",
  },
});

export default oxfmtConfig;
