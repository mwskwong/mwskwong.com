import { defineConfig } from "oxlint";

const oxlintConfig = defineConfig({
  plugins: ["eslint", "typescript", "unicorn", "react", "nextjs", "oxc", "import", "jsx-a11y"],
  categories: {
    correctness: "error",
    suspicious: "error",
    pedantic: "error",
    perf: "warn",
    restriction: "warn",
  },
  rules: {
    "eslint/no-undefined": "off",
    "typescript/prefer-readonly-parameter-types": "off",
    "typescript/strict-boolean-expressions": "off",
    "typescript/explicit-module-boundary-types": "off",
    "typescript/explicit-function-return-type": "off",
    "react/forbid-component-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-no-literals": "off",
    "react/react-compiler": "error",
    "react/only-export-components": "off",
    "oxc/no-rest-spread-properties": "off",
    "oxc/no-optional-chaining": "off",
  },
  options: { typeAware: true, typeCheck: true },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: { "eslint/max-lines-per-function": "off" },
    },
    {
      files: [
        "next.config.ts",
        "oxlint.config.ts",
        "oxfmt.config.ts",
        "postcss.config.ts",
        "src/app/**/{page,layout}.tsx",
        "src/app/{robots,sitemap}.ts",
      ],
      rules: { "import/no-default-export": "off" },
    },
  ],
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
});

export default oxlintConfig;
