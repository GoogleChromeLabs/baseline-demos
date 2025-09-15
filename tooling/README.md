# Baseline tooling demos

A collection of simple demos built with Baseline-compatible developer tools

## Compilers

Compilers are tools that take cutting edge features that you author in source code and transform them down to something that has better browser support depending on their Baseline status.

### [Babel](./babel)

Learn how to use built-in Baseline support in browserslist with `babel-preset-env` to compile JavaScript features depending on their Baseline status.

### [PostCSS](./postcss)

Learn how to use built-in Baseline support in browserslist with `postcss-preset-env` to compile CSS features depending on their Baseline status.

## Bundlers

## [webpack](./webpack-browserslist-config-baseline)

Learn how to use built-in Baseline support in browserslist with Babel and other tools with webpack as your bundler.

## [Rollup](./rollup-browserslist-config-baseline)

Learn how to use built-in Baseline support in browserslist with Babel and other tools with Rollup as your bundler.

## Linters

Linters are tools that warn you as part of your build process or editor when you use features that may be considered too cutting edge relative to your Baseline targets.

### [ESLint](./eslint)

Learn how to use the `use-baseline` rule provided by `@eslint/css` and `html-eslint` for CSS and HTML linting of features depending on their Baseline status.

### [Stylelint](./stylelint)

Learn how to use the `stylelint-plugin-use-baseline` plugin to lint CSS features depending on their Baseline status.

## Utilities

Baseline utils are tools that power other developer tools. These demos are meant to show how developers can use them to build new Baseline tooling.

### [compute-baseline](./compute-baseline)

Learn how to query a feature's Baseline status by its BCD key.

### [baseline-browser-mapping](./baseline-browser-mapping)

Learn how to get a list of browser versions from their corresponding Baseline status.
