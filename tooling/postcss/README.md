# PostCSS Preset Env

[`postcss-preset-env`](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) transforms stylesheets to add fallbacks for unsupported features. It includes [`autoprefixer`](https://github.com/postcss/autoprefixer), which adds vendor prefixes to unsupported properties as needed. Similar to Babel (see [demo](../babel)), this plugin respects browserslist targets.

## Set up

Install dependencies:

```sh
npm i
```

## Browserslist defaults

1. Open `.browserslistrc` and ensure that the contents are set to `defaults`
2. Run the build script:
    ```sh
    npm run build:css
    ```
3. Open the output file at [dist/test.css](dist/test.css)

Compare the output against the source file at [src/test.css](src/test.css). There are a few notable differences:

- `grid-gap` is added as a fallback for `gap`
    ```diff
    + grid-gap: 1rem;
      gap: 1rem;
    ```
- `rgb` replaces `color-mix`
    ```diff
    - background: color-mix(in srgb, lightblue, white 80%);
    + background: rgb(239, 247, 250);
    ```
- `-o-object-fit` is added as a fallback for `object-fit`:
    ```diff
    + -o-object-fit: contain;
        object-fit: contain;
    ```

## Baseline 2024

1. Open `.browserslistrc` and replace the contents with:
    ```
    extends browserslist-config-baseline/2024
    ```
2. Run the build script:
    ```sh
    npm run build:css
    ```
3. Open the output file at [dist/test.css](dist/test.css)

`browserslist-config-baseline` was pre-installed as part of the setup step above. It enables you to specify Baseline years as your browserslist target.

As you can see in the output file, none of the previous transformations have been applied because the corresponding features are included in the Baseline 2024 feature set.

## Baseline widely available

1. Open `.browserslistrc` and replace the contents with:
    ```
    extends browserslist-config-baseline
    ```
2. Run the build script:
    ```sh
    npm run build:css
    ```
3. Open the output file at [dist/test.css](dist/test.css)


Now, the only feature that is not currently widely available and has fallbacks provided by `postcss-preset-env` is `color-mix`:

- `rgb` replaces `color-mix`
    ```diff
    - background: color-mix(in srgb, lightblue, white 80%);
    + background: rgb(239, 247, 250);
    ```

## `:has`

`:has` became Baseline newly available in December 2023, but by default `postcss-preset-env` does not compile it. To fall back to older CSS when it doesn't meet your Baseline target, the [feature](https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md) needs to be enabled manually in `postcss.config.js`:

1. Open `postcss.config.js` and replace the contents with:
    ```js
    module.exports = {
      plugins: [
        require('postcss-preset-env')({
          features: {
            'has-pseudo-class': true,
          },
          autoprefixer: {
            grid: true
          }
        })
      ]
    };
    ```
2. Open `.browserslistrc` and replace the contents with:
    ```
    extends browserslist-config-baseline
    ```
3. Run the build script:
    ```sh
    npm run build:css
    ```
4. Open the output file at [dist/test.css](dist/test.css)

You should see a new style rule added before the `:has` selector:

```diff
+.js-has-pseudo _[csstools-has-1a-2r-33-32-38-2p-2x-32-2t-36-1m-2w-2p-37-14-1a-2r-2p-36-2s-1m-2w-33-3a-2t-36-15]:not(.does-not-exist):not(.does-not-exist) {
+  outline: 2px solid rebeccapurple;
+}
+
.container:has(.card:hover) {
  outline: 2px solid rebeccapurple;
}
```
