import { RuleTester } from "eslint";
import noRestrictedSyntaxRule from "../../src/rules/no-restricted-syntax.js";

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: "latest" },
});

ruleTester.run("no-restricted-syntax", noRestrictedSyntaxRule, {
  valid: [
    {
      code: "console.log('This is fine.');",
      options: ["console.warn"],
    },
    {
      code: "console.log('Debugging!');",
      options: [{ pattern: "console.error" }],
    },
  ],
  invalid: [
    {
      code: "console.log('Debugging!');",
      options: ["console.log"],
      errors: [{ message: "Restricted syntax found." }],
    },
    {
      code: "console.error('Error!');",
      options: [
        { pattern: "console.error", message: "Avoid using console.error." },
      ],
      errors: [{ message: "Avoid using console.error." }],
    },
  ],
});
