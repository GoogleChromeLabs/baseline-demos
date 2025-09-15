# Baseline demo: Babel

The source code for this demo is [src/test.js](src/test.js), which contains several examples of modern JavaScript code.

The goal of the demo is to see how the output code is affected by different [.browserslistrc](.browserslistrc) configurations:

- the default config (discouraged)
- a pseudo-Baseline config
- 

## Setup

1. From this directory run `npm i`

## Default browserslist config (discouraged)

Babel recommends setting target versions in the Babel or browserslist configurations to reduce output size. Without one, the default behavior is to fall back to ES5:

> When no targets are specified: Babel will assume you are targeting the oldest browsers possible. For example, @babel/preset-env will transform all ES2015-ES2020 code to be ES5 compatible.

> [!NOTE]
> The default behavior will change in Babel 8 so that it falls back to browserslist's `defaults` query, which is much more modern.

To test this:

1. Open [.browserslistrc](.browserslistrc) and ensure that the config is empty
2. Run `npm run build`
3. Open [lib/test.js](lib/test.js) to see the output

The output will be stripped of all newer JavaScript syntax, for example arrow functions will be replaced with function expressions and `const` replaced with `var`:

```diff
-const add = (a, b) => a + b;
+var add = function add(a, b) {
+ return a + b;
+};
```

File | Size (KB)
-- | --
src/test.js | 1.3
lib/test.js | 11.8

## Baseline widely available

Browserslist now has built-in support for Baseline. To use it:

1. Open [.browserslistrc](.browserslistrc)
2. Replace the contents with

  ```diff
  +baseline widely available
  ```
3. Run `npx browserslist` to see the browser versions included in the browserslist config
4. Run `npm run build`
5. Open [lib/test.js](lib/test.js) to see the output

File | Size (KB)
-- | --
src/test.js | 1.3
lib/test.js | 1.4

Note: Alternatively you can specify the browserslist target in `babel.config.json`:

```diff
{
  "presets": ["@babel/preset-env"],
+ "targets": "baseline widely available"
}
```

## Baseline newly available

You can also try the Newly available target:

1. Open [.browserslistrc](.browserslistrc)
2. Replace the contents with

  ```diff
  +baseline newly available
  ```
3. Run `npx browserslist` to see the browser versions included in the browserslist config
4. Run `npm run build`
5. Open [lib/test.js](lib/test.js) to see the output

This will target the most recent features that have achieved Baseline status.

## Baseline years

You can also target specific years when features became Baseline Newly available. For example, to target features that were Baseline Newly available by the end of 2020:

1. Open [.browserslistrc](.browserslistrc)
2. Replace the contents with

  ```diff
  +baseline 2020
  ```
3. Run `npx browserslist` to see the browser versions included in the browserslist config
4. Run `npm run build`
5. Open [lib/test.js](lib/test.js) to see the output

File | Size (KB)
-- | --
src/test.js | 1.3
lib/test.js | 1.5

Now let's see the effect of an even older Baseline year on bundle size:

1. Open [.browserslistrc](.browserslistrc)
2. Replace the contents with

  ```diff
  +baseline 2016
  ```
3. Run `npx browserslist` to see the browser versions included in the browserslist config
4. Run `npm run build`
5. Open [lib/test.js](lib/test.js) to see the output

File | Size (KB)
-- | --
src/test.js | 1.3
lib/test.js | 10.4

The output file is much larger now that many more polyfills are required for the older browser versions targeted by the 2016 Baseline year.
