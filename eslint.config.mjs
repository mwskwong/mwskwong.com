// @ts-check

import { URL, fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import next from "@next/eslint-plugin-next";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unicorn from "eslint-plugin-unicorn";
import ts from "typescript-eslint";

const eslintConfig = defineConfig(
  js.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  unicorn.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  importPlugin.flatConfigs.react,
  comments.recommended,
  jsxA11y.flatConfigs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat["recommended-latest"],
  next.configs["core-web-vitals"],
  prettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
      "jsx-a11y": {
        components: {
          Image: "img",
        },
      },
      react: { version: "detect" },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        { ignoreArrowShorthand: true },
      ],
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
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
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

      "import/order": [
        "warn",
        {
          alphabetize: { order: "asc" },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
      "sort-imports": ["warn", { ignoreDeclarationSort: true }],

      // ref: https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
      "import/named": "off",
      "import/namespace": "off",
      "import/default": "off",
      "import/no-named-as-default-member": "off",
      "import/no-unresolved": "off",

      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          reservedFirst: true,
        },
      ],
    },
  },
  {
    files: ["**/*.*js"],
    extends: [ts.configs.disableTypeChecked],
  },
  includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url))),
);

export default eslintConfig;
