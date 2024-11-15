import noRestrictedSyntaxRule from "./rules/no-restricted-syntax.js";

/**
 * @type {import("eslint").ESLint.Plugin}
 */
const plugin = {
  meta: {
    name: "eslint-plugin-ast-grep",
  },
  rules: {
    "no-restricted-syntax": noRestrictedSyntaxRule,
  },
};

export default plugin;
