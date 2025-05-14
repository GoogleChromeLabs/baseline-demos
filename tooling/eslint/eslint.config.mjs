import globals from "globals";
import css from "@eslint/css";
import html from "@html-eslint/eslint-plugin";
import compat from "eslint-plugin-compat";


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
    ...compat.configs["flat/recommended"],
    settings: {
      "lintAllEsApis": true,
    },
    rules: {
      "compat/compat": ["warn"],
    },
  },
];
