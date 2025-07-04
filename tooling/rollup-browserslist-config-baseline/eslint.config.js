/* eslint-disable */

import js from "@eslint/js";
import css from "@eslint/css";
import html from "@html-eslint/eslint-plugin";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist"]
  },
  {
    files: [
      "**/*.{js,jsx}"
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true
        },
        sourceType: "module"
      }
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": [
        "error", {
          varsIgnorePattern: "^[A-Z_]"
        }
      ],
      "react-refresh/only-export-components": [
        "warn", {
          allowConstantExport: true
        }
      ]
    }
  },
  // Lint CSS files for Baseline:
  {
    files: ["**/*.css"],
    plugins: {
      css
    },
    language: "css/css",
    rules: {
      "css/no-duplicate-imports": "error",
      // Lint CSS files to ensure they are using
      // only Baseline Widely available features:
      "css/use-baseline": ["warn", {
        available: "widely"
      }]
    },
  },
  // Lint HTML and JSX files for Baseline:
  {
    files: ["**/*.html"],
    ...html.configs["flat/recommended"],
    rules: {
      // Lint HTML files to ensure they are using
      // only Baseline Widely available features:
      "@html-eslint/use-baseline": ["warn", {
        available: "widely"
      }]
    }
  }
]
