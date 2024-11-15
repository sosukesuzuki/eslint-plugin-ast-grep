# eslint-plugin-ast-grep

ESLint plugin with [`ast-grep`](https://ast-grep.github.io/).

## Installation

```
npm i -D eslint-plugin-ast-grep
```

## Requirements

- ESLint 9.0.0
- ast-grep 0.3.0

## Rules

### `no-restricted-syntax`

Restricts syntaxes specified by ast-grep. Inspired by [`no-restricted-syntax`](https://eslint.org/docs/latest/rules/no-restricted-syntax) from ESLint core.

#### Options

This rule takes a list of strings, where each string is an ast-grep pattern:

```json
{
  "rules": {
    "ast-grep/no-restricted-syntax": ["error", "console.log", "console.warn"]
  }
}
```

Alternatively, the rule also accepts objects, where the pattern and an optional custom message are specified:

```json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "console.log",
        "message": "console.log is not allowed."
      }
    ]
  }
}
```
