import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import onlyWarn from 'eslint-plugin-only-warn';
import perfectionist from 'eslint-plugin-perfectionist';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      perfectionist
    },
    rules: {
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
