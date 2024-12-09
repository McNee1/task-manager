import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      importPlugin.flatConfigs.recommended,
      eslintConfigPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    settings: {
      react: { version: '18.3' },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
        },
        typescript: {
          alwaysTryTypes: true,

          project: ['./tsconfig.node.json', './tsconfig.app.json'],
        },
      },
    },
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      perfectionist,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',

      //
      'import/no-dynamic-require': 'warn',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-internal-modules': [
        'error',
        {
          allow: ['react-dom/client', '**/*.svg', '@/shared/*', '@/shared/assets/**'],
        },
      ],
      //
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      //
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          ignoreCase: true,
          specialCharacters: 'keep',
          internalPattern: ['^@/.+'],
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'always',
          maxLineLength: undefined,
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              react: ['^react$', '^react-.*$'],
              app: ['^app$', '^@/app/.*$'],
              pages: ['^pages$', '^@/pages/.*$'],
              widgets: ['^widgets$', '^@/widgets/.*$'],
              features: ['^features$', '^@/features/.*$'],
              entities: ['^entities$', '^@/entities/.*$'],
              shared: ['^shared$', '^@/shared/.*$'],
            },
            type: {
              react: ['^react$', '^react-.*$'],
            },
          },
          environment: 'node',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'line-length',
          order: 'desc',
          groups: ['multiline', 'unknown', 'shorthand'],
        },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
        },
      ],

      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
        },
      ],
      //
      'prettier/prettier': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/no-unresolved': [
        'error',
        {
          ignore: ['\\.svg$'],
        },
      ],
    },
  }
);
