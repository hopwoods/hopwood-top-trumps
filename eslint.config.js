import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config(
  {
    ignores: [
      'dist/',
      'node_modules/',
      'coverage/',
      '.turbo/',
      '*.log',
      '*.lock',
      'playwright.config.ts',
      'playwright-report/', // Added from common ignore patterns
      'test-results/', // Added from common ignore patterns
      'fable-forge-functions/lib/', // Common for compiled TS in functions
      'fable-forge-functions/node_modules/',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX,
      'react-dom': reactDom,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,
    },
  },
  // Configuration for the 'fable-forge-functions' directory
  {
    files: ['fable-forge-functions/src/**/*.{ts,tsx}'], // Target files in the functions src folder
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: ['./fable-forge-functions/tsconfig.json'], // Use the tsconfig specific to functions
        tsconfigRootDir: import.meta.dirname, // Root of the monorepo
      },
    },
    plugins: {
      // Add any specific plugins for Firebase Functions if needed, otherwise can be minimal
      // For now, keeping it simple
    },
    rules: {
      // Add or override rules specific to Firebase Functions if necessary
      // For example, you might have different module system rules or global variable expectations
    },
  }
)
