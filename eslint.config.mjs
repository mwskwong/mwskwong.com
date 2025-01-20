// @ts-check

import path from "node:path";
import url from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintPluginComments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslintConfigPrettier from "eslint-config-prettier";
import * as eslintPluginImport from "eslint-plugin-import";
import eslintPluginReactCompiler from "eslint-plugin-react-compiler";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,  
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    extends: [
      eslintPluginImport.flatConfigs?.recommended,
      eslintPluginImport.flatConfigs?.typescript,
      eslintPluginImport.flatConfigs?.react,
    ],
  },
  // @ts-expect-error -- type error, but it is actually working
  eslintPluginComments.recommended,
  eslintPluginJsxA11y.flatConfigs.strict,
  {
    extends: [
      eslintPluginReact.configs.flat?.recommended,
      eslintPluginReact.configs.flat?.["jsx-runtime"],
    ],
  },
  compat.extends("plugin:react-hooks/recommended"),
  compat.extends("plugin:@next/next/recommended"),
  {
    plugins: {
      'react-compiler': eslintPluginReactCompiler,
    },
  },
  compat.extends("plugin:drizzle/recommended"),
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
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        { ignoreArrowShorthand: true },
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
          allowAny: false,
          allowBoolean: false,
          allowNever: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
        },
      ],
      "import/namespace": "off",
      "import/default": "off",
      "import/no-named-as-default-member": "off",
      "import/no-unresolved": "off",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
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
      "sort-imports": ["warn", { ignoreDeclarationSort: true }],
      "unicorn/prevent-abbreviations": [
        "error",
        {
          replacements: {
            props: false,
          },
          allowList: {
            devOps: true,
            generateStaticParams: true,
            ParamsPage: true,
          },
        },
      ],
    },
  },
  {
    files: ["**/*.*js"],
    extends: [tseslint.configs.disableTypeChecked],
  },
);

export default config;
