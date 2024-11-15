import { parse, Lang, pattern } from "@ast-grep/napi";

/**
 *
 * @param {import("eslint").Linter.LanguageOptions} languageOptions
 * @returns {import("@ast-grep/napi").Lang}
 */
function getLangFromLanguageOption(languageOptions) {
  if (languageOptions.parser?.meta?.name === "typescript-eslint/parser") {
    return Lang.TypeScript;
  }
  return Lang.JavaScript;
}

/**
 * @type {import("eslint").Rule.RuleModule}
 */
const noRestrictedSyntaxRule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow specified syntax by ast-grep",
      recommended: false,
    },
    schema: {
      type: "array",
      items: {
        oneOf: [
          {
            type: "string",
          },
          {
            type: "object",
            properties: {
              pattern: { type: "string" },
              message: { type: "string" },
            },
            required: ["pattern"],
            additionalProperties: false,
          },
        ],
      },
      uniqueItems: true,
      minItems: 0,
    },
    messages: {
      restrictedSyntax: "{{message}}",
    },
  },
  create(context) {
    /** @type {Array<{ pattern: string, message: string } | string>} */
    const patterns = context.options;
    const sgLang = getLangFromLanguageOption(context.languageOptions);

    return {
      Program() {
        const sourceCode = context.sourceCode.text;
        const root = parse(sgLang, sourceCode);

        patterns.forEach((entry) => {
          const patternStr = typeof entry === "string" ? entry : entry.pattern;
          const message =
            typeof entry === "string"
              ? "Restricted syntax found."
              : entry.message;

          try {
            const patternNode = pattern(sgLang, patternStr);
            root
              .root()
              .findAll(patternNode)
              .forEach((match) => {
                const loc = match.range();
                context.report({
                  loc: {
                    start: loc.start,
                    end: loc.end,
                  },
                  messageId: "restrictedSyntax",
                  data: {
                    message,
                  },
                });
              });
          } catch (error) {
            context.report({
              loc: { line: 1, column: 0 },
              // @ts-ignore
              message: `Invalid pattern: ${patternStr}. Error: ${error.message}`,
            });
          }
        });
      },
    };
  },
};

export default noRestrictedSyntaxRule;
