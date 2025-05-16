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

## Pseudo-Baseline config

The browserslist config allows rules that will get you most of the way to Baseline widely available:

1. Open [.browserslistrc](.browserslistrc)
2. Replace the contents with

    ```
    chrome >0 and last 2.5 years
    edge >0 and last 2.5 years
    safari >0 and last 2.5 years
    firefox >0 and last 2.5 years
    and_chr >0 and last 2.5 years
    and_ff >0 and last 2.5 years
    ios >0 and last 2.5 years
    ```
3. Run `npx browserslist` to see the browser versions included in the browserslist config
4. Run `npm run build`
5. Open [lib/test.js](lib/test.js) to see the output

The output file should now contain the modern JavaScript with minimal transformations.

File | Size (KB)
-- | --
src/test.js | 1.3
lib/test.js | 1.4

This way of emulating Baseline widely available is called a pseudo-Baseline config for a couple of reasons:

- it doesn't use the Baseline semantics of "Widely available"
- it omits the earliest browser version available at the time 2.5 years ago

To confirm the second issue, run `npx browserslist` and note the earliest Chrome version. Its release date will always be after today's date 2.5 years ago.

## Baseline widely available

The default configuration of the [`browserslist-config-baseline`](https://github.com/web-platform-dx/browserslist-config-baseline) plugin is Baseline widely available. To use it:

1. Open [.browserslistrc](.browserslistrc)
2. Replace the contents with

  ```diff
  +extends browserslist-config-baseline
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
+ "targets": "extends browserslist-config-baseline"
}
```

## Baseline widely available with downstream browsers

1. Open [.browserslistrc](.browserslistrc)
2. Replace the contents with

  ```diff
  +extends browserslist-config-baseline/with-downstream
  ```
3. Run `npx browserslist` to see the browser versions included in the browserslist config
4. Run `npm run build`
5. Open [lib/test.js](lib/test.js) to see the output

File | Size (KB)
-- | --
src/test.js | 1.3
lib/test.js | 1.4

## Baseline years

Set the Baseline year to 2020:

1. Open [.browserslistrc](.browserslistrc)
2. Replace the contents with

  ```diff
  +extends browserslist-config-baseline/2020
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
  +extends browserslist-config-baseline/2016
  ```
3. Run `npx browserslist` to see the browser versions included in the browserslist config
4. Run `npm run build`
5. Open [lib/test.js](lib/test.js) to see the output

File | Size (KB)
-- | --
src/test.js | 1.3
lib/test.js | 10.4

The output file is much larger now that many more polyfills are required.

## Baseline years with downstream browsers

1. Open [.browserslistrc](.browserslistrc)
2. Replace the contents with

  ```diff
  +extends browserslist-config-baseline/with-downstream/2020
  ```
3. Run `npx browserslist` to see the browser versions included in the browserslist config
4. Run `npm run build`
5. Open [lib/test.js](lib/test.js) to see the output

File | Size (KB)
-- | --
src/test.js | 1.3
lib/test.js | 1.5
