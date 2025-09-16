import globals from "globals";
import css from "@eslint/css";
import html from "@html-eslint/eslint-plugin";
import js from "eslint-plugin-baseline-js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    files: ["**/*.css"],
    plugins: {
      css,
    },
    language: "css/css",
    rules: {
      "css/use-baseline": ["warn", {
        "available": "widely"
      }],
    },
  },
  {
    ...html.configs["flat/recommended"],
    files: ["**/*.html"],
    rules: {
      "@html-eslint/use-baseline": ["warn", {
        "available": "widely"
      }],
    },
  },
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: { "baseline-js": js },
    rules: {
      "baseline-js/use-baseline": ["warn", {
        available: "widely",
        includeWebApis: { preset: "auto" },
        includeJsBuiltins: { preset: "auto" }
      }],
    },
  },
];
