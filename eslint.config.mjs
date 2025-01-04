// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import * as eslintPluginImport from "eslint-plugin-import";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import path from "node:path";
import url from "node:url";
import tseslint from "typescript-eslint";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = tseslint.config(
  eslint.configs.recommended,
  // eslint-disable-next-line import/no-named-as-default-member
  tseslint.configs.strictTypeChecked,
  // eslint-disable-next-line import/no-named-as-default-member
  tseslint.configs.stylisticTypeChecked,
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    extends: [
      eslintPluginImport.flatConfigs?.recommended,
      eslintPluginImport.flatConfigs?.typescript,
      eslintPluginImport.flatConfigs?.react,
    ],
  },
  compat.extends("plugin:eslint-comments/recommended"),
  eslintPluginJsxA11y.flatConfigs.strict,
  eslintPluginReact.configs.flat?.recommended ?? {},
  eslintPluginReact.configs.flat?.["jsx-runtime"] ?? {},
  compat.extends("plugin:react-hooks/recommended"),
  compat.extends("plugin:@next/next/recommended"),
  compat.plugins("react-compiler"),
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import/resolver": {
        typescript: { alwaysTryTypes: true },
        node: true,
      },
      "jsx-a11y": {
        polymorphicPropName: "as",
        components: {
          Button: "button",
          IconButton: "button",
          Image: "img",
          Link: "a",
        },
      },
      react: { version: "detect" },
      linkComponents: ["Link"],
    },
    rules: {
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allow: [{ name: ["Error", "URL", "URLSearchParams"], from: "lib" }],
          allowAny: false,
          allowBoolean: false,
          allowNever: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
        },
      ],
      "import/order": "off",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: "last",
          reservedFirst: true,
        },
      ],
      "react-compiler/react-compiler": "error",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          replacements: {
            props: false,
          },
          allowList: {
            devOps: true,
            generateStaticParams: true,
          },
        },
      ],
    },
  },
  {
    files: ["**/*.*js"],
    // eslint-disable-next-line import/no-named-as-default-member
    extends: [tseslint.configs.disableTypeChecked],
  },
);

export default config;
