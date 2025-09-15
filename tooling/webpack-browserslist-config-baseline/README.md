# webpack

This demo shows how a (very) simple React app can be built with [webpack](https://webpack.js.org/) while using the built-in Baseline support in [Browserslist](https://browsersl.ist/) to specify a Baseline target.

This demo uses:

- [webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
  - [`@babel/preset-env`](http://babeljs.io/docs/babel-preset-env)
  - [`@babel/preset-react`](http://babeljs.io/docs/babel-preset-react)
  - [`core-js`](https://www.npmjs.com/package/core-js)
- [PostCSS](https://postcss.org/)
  - [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
- [Browserslist](https://browsersl.ist/) with built-in Baseline support

## Setup

First, clone this repo:

```
git clone git@github.com:GoogleChromeLabs/baseline-demos.git
```

Then navigate into the directory containing this demo:

```
cd baseline-demos/tooling/webpack-browserslist-config-baseline
```

**Optional:** if you use `nvm`, do the following in the root directory:

```
nvm i
nvm use
```

Install npm packages:

```
npm i
```

To see the app, run this:

```
npm start
```

Then navigate to [http://localhost:8080](http://localhost:8080) on your local machine. This demo is just for illustrative purposes, and the big thing you'll want to do is see how various Baseline targets influence things like code size and the targeted environments.

## See how changing your Baseline target changes your code

Browserslist now has built-in support for Baseline targets. In `package.json`, you can target Baseline Widely available like so:

```js
"browserslist": "baseline widely available"
```

However, you can specify a year (back to 2016) as a fixed target using the following format:

```js
"browserslist": "baseline 2020"
```

This project defaults to the Widely available target. Try building the project:

```
npm run build
```

`babel.config.js` specifies `debug: true` for `@babel/preset-env`, which provides a bunch of extra information in the terminal that changes based on your Browserslist config.

### Baseline Widely available

When building the project initially using the Baseline Widely available target, here's the list of browsers that gets passed to Browserslist:

```
Using targets: {
  "chrome": "111",
  "edge": "111",
  "firefox": "111",
  "ios": "16",
  "safari": "16"
}
```

Here are the polyfills that get injected by `core-js` with this target:

```
Using polyfills with `usage-global` method:

[/private/var/www/baseline-demos/tooling/webpack-browserslist-baseline-config/src/js/App.jsx]
The corejs3 polyfill added the following polyfills:
  es.iterator.constructor { "chrome":"111", "edge":"111", "firefox":"111", "ios":"16", "safari":"16" }
  es.iterator.filter { "chrome":"111", "edge":"111", "firefox":"111", "ios":"16", "safari":"16" }
  es.iterator.map { "chrome":"111", "edge":"111", "firefox":"111", "ios":"16", "safari":"16" }
```

Here are the plugins that get used by Babel:

```
Using plugins:
  transform-explicit-resource-management { chrome < 134, edge < 134, firefox, ios, safari }
  transform-duplicate-named-capturing-groups-regex { chrome < 126, edge < 126, firefox < 129, ios < 17.4, safari < 17.4 }
  transform-regexp-modifiers { chrome < 125, edge < 125, firefox < 132, ios, safari }
  transform-unicode-sets-regex { chrome < 112, edge < 112, firefox < 116, ios < 17, safari < 17 }
  bugfix/transform-firefox-class-in-computed-class-key { firefox < 126 }
  proposal-class-static-block { ios < 16.4, safari < 16.4 }
  syntax-private-property-in-object
  syntax-class-properties
  syntax-numeric-separator
  syntax-nullish-coalescing-operator
  syntax-optional-chaining
  syntax-json-strings
  syntax-optional-catch-binding
  transform-parameters { ios < 16.3, safari < 16.3 }
  syntax-async-generators
  syntax-object-rest-spread
  syntax-export-namespace-from
  syntax-dynamic-import
  syntax-top-level-await
  syntax-import-meta
```

### Baseline 2016

Now try changing the Browserslist in `package.json` to use the 2016 target:

```js
"browserslist": "baseline 2016"
```

Now rebuild:

```
npm run build
```

Notice how the list of browsers passed to Browserslist changes:

```
Using targets: {
  "chrome": "53",
  "edge": "14",
  "firefox": "49",
  "ios": "11",
  "safari": "11"
}
```

See how the polyfills that get injected by `core-js` with this target changes:

```
[/private/var/www/baseline-demos/tooling/webpack-browserslist-baseline-config/src/js/App.jsx]
The corejs3 polyfill added the following polyfills:
  es.array.filter { "edge":"14" }
  es.iterator.constructor { "chrome":"53", "edge":"14", "firefox":"49", "ios":"11", "safari":"11" }
  es.iterator.filter { "chrome":"53", "edge":"14", "firefox":"49", "ios":"11", "safari":"11" }
  es.object.to-string { "edge":"14", "firefox":"49" }
  es.array.includes { "firefox":"49" }
  es.string.includes { "edge":"14" }
  es.array.map { "firefox":"49" }
  es.iterator.map { "chrome":"53", "edge":"14", "firefox":"49", "ios":"11", "safari":"11" }
  es.symbol { "edge":"14", "firefox":"49" }
  es.symbol.description { "chrome":"53", "edge":"14", "firefox":"49", "ios":"11", "safari":"11" }
  es.array.iterator { "chrome":"53", "edge":"14", "firefox":"49" }
  web.dom-collections.iterator { "chrome":"53", "edge":"14", "firefox":"49", "ios":"11", "safari":"11" }
  es.array.push { "chrome":"53", "edge":"14", "firefox":"49", "ios":"11", "safari":"11" }
  es.regexp.to-string { "edge":"14" }
  es.array.from { "edge":"14", "firefox":"49" }
  es.regexp.exec { "chrome":"53", "edge":"14", "firefox":"49", "ios":"11", "safari":"11" }
  es.regexp.test { "edge":"14" }
  es.error.cause { "chrome":"53", "edge":"14", "firefox":"49", "ios":"11", "safari":"11" }
```

Also note how the Babel plugins change based on the older target:

```
Using plugins:
  transform-explicit-resource-management { chrome < 134, edge < 134, firefox, ios, safari }
  transform-duplicate-named-capturing-groups-regex { chrome < 126, edge < 126, firefox < 129, ios < 17.4, safari < 17.4 }
  transform-regexp-modifiers { chrome < 125, edge < 125, firefox < 132, ios, safari }
  transform-unicode-sets-regex { chrome < 112, edge < 112, firefox < 116, ios < 17, safari < 17 }
  proposal-class-static-block { chrome < 94, edge < 94, firefox < 93, ios < 16.4, safari < 16.4 }
  proposal-private-property-in-object { chrome < 91, edge < 91, firefox < 90, ios < 15, safari < 15 }
  proposal-class-properties { chrome < 74, edge < 79, firefox < 90, ios < 14.5, safari < 14.1 }
  proposal-private-methods { chrome < 84, edge < 84, firefox < 90, ios < 15, safari < 15 }
  proposal-numeric-separator { chrome < 75, edge < 79, firefox < 70, ios < 13, safari < 13 }
  proposal-logical-assignment-operators { chrome < 85, edge < 85, firefox < 79, ios < 14, safari < 14 }
  proposal-nullish-coalescing-operator { chrome < 80, edge < 80, firefox < 72, ios < 13.4, safari < 13.1 }
  proposal-optional-chaining { chrome < 91, edge < 91, firefox < 74, ios < 13.4, safari < 13.1 }
  proposal-json-strings { chrome < 66, edge < 79, firefox < 62, ios < 12, safari < 12 }
  proposal-optional-catch-binding { chrome < 66, edge < 79, firefox < 58, ios < 11.3, safari < 11.1 }
  transform-parameters { edge < 18, firefox < 52, ios < 16.3, safari < 16.3 }
  proposal-async-generator-functions { chrome < 63, edge < 79, firefox < 57, ios < 12, safari < 12 }
  proposal-object-rest-spread { chrome < 60, edge < 79, firefox < 55, ios < 11.3, safari < 11.1 }
  transform-dotall-regex { chrome < 62, edge < 79, firefox < 78, ios < 11.3, safari < 11.1 }
  proposal-unicode-property-regex { chrome < 64, edge < 79, firefox < 78, ios < 11.3, safari < 11.1 }
  transform-named-capturing-groups-regex { chrome < 64, edge < 79, firefox < 78, ios < 11.3, safari < 11.1 }
  transform-async-to-generator { chrome < 55, edge < 15, firefox < 52, ios < 11, safari < 11 }
  transform-exponentiation-operator { firefox < 52, ios < 10.3, safari < 10.1 }
  transform-template-literals { ios < 13, safari < 13 }
  transform-literals { firefox < 53 }
  transform-function-name { edge < 79, firefox < 53 }
  transform-for-of { edge < 15, firefox < 53 }
  transform-unicode-escapes { firefox < 53 }
  transform-unicode-regex { ios < 12, safari < 12 }
  transform-destructuring { edge < 15, firefox < 53 }
  transform-block-scoping { firefox < 53, ios < 11, safari < 11 }
  transform-regenerator { firefox < 53 }
  proposal-export-namespace-from { chrome < 72, edge < 79, firefox < 80, ios < 14.5, safari < 14.1 }
  syntax-dynamic-import
  syntax-top-level-await
  syntax-import-meta
```

As you might guess, these changes have an effect on output size—including on how Autoprefixer transforms CSS:

- Baseline Widely available:
  - JavaScript bundle size: `208 KiB`
  - CSS size: `3.64 KiB`
- Baseline 2016:
  - JavaScript bundle size: `232 KiB`
  - CSS size: `3.91 KiB`

Performance isn't the only consideration here, but selecting a Baseline target can influence performance depending on your app's requirements and what polyfills and transforms it needs to function based on the target you set.
