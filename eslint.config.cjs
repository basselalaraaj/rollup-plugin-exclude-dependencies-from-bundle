// eslint.config.cjs

const js = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

/** @type {import("eslint").FlatConfig[]} */
module.exports = [
  {
    ignores: ["dist", "node_modules", "**/*.spec.*"],
  },
  {
    // Only lint .ts files
    files: ["**/*.ts"],

    languageOptions: {
      // Use the TypeScript parser
      parser: tsParser,
      // Modern ECMAScript features + modules
      ecmaVersion: "latest",
      sourceType: "module",
      // Combine Node + Browser globals
      // If you need type-aware rules, include:
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    // Register the TS plugin
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    // Merge ESLint's recommended rules + TypeScript recommended rules
    rules: {
      // ...js.configs.recommended.rules,
      // ...tsPlugin.configs.recommended.rules,
      // Example overrides:
      // "@typescript-eslint/no-explicit-any": "warn",
      // "@typescript-eslint/explicit-module-boundary-types": "off"
    },
  },
];
