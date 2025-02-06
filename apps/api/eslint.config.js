/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const baseConfig = require('@repo/eslint-config/base');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    ignores: ['eslint.config.js', 'node_modules/', 'dist/'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'script'
      }
    },
    plugins: {
      prettier
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'error'
    }
  }
];
