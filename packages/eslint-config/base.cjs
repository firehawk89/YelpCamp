const js = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');
const turboPlugin = require('eslint-plugin-turbo');
const tseslint = require('typescript-eslint');
const onlyWarn = require('eslint-plugin-only-warn');
const perfectionist = require('eslint-plugin-perfectionist');

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 */
module.exports = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      perfectionist
    },
    rules: {
      '@typescript-eslint/no-required-imports': 'off',
      'turbo/no-undeclared-env-vars': 'warn',
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc'
        }
      ]
    }
  },
  {
    plugins: {
      onlyWarn
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**']
  }
];
