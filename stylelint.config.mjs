// @ts-check

/** @type {import("stylelint").Config} */
const stylelintConfig = {
  // ref: https://help.mantine.dev/q/how-to-setup-stylelint#configuration
  extends: ["stylelint-config-standard-scss", "stylelint-config-recess-order"],
  rules: {
    "scss/no-duplicate-mixins": undefined,
    "scss/at-mixin-pattern": undefined,
    "scss/at-rule-no-unknown": undefined,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.module.css"],
      extends: ["stylelint-config-css-modules"],
      rules: {
        "selector-class-pattern": "^[a-z][a-zA-Z0-9]*$", // enforce CSS module class names to be in camelCase
      },
    },
  ],
};

export default stylelintConfig;
