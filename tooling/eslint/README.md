# Baseline demo: ESLint

## Setup

```sh
npm i
```

## eslint/css

[`eslint/css`](https://github.com/eslint/css) is the official CSS linter of ESLint.

### Baseline widely available

Run the test stylesheet through `eslint`:

```sh
npm run lint:css
```

Output:

```sh
   6:15  warning  Type 'color-mix' is not a widely available baseline feature                   css/use-baseline
   7:3   warning  Property 'container-type' is not a widely available baseline feature          css/use-baseline
   8:3   warning  Property 'accent-color' is not a widely available baseline feature            css/use-baseline
  15:3   warning  Property 'view-transition-name' is not a widely available baseline feature    css/use-baseline
  16:3   warning  Property 'font-language-override' is not a widely available baseline feature  css/use-baseline
  21:17  warning  Type 'color-mix' is not a widely available baseline feature                   css/use-baseline
  26:3   warning  Property 'font-stretch' is not a widely available baseline feature            css/use-baseline
  29:11  warning  Selector 'has' is not a widely available baseline feature                     css/use-baseline
  30:3   warning  Property 'outline' is not a widely available baseline feature                 css/use-baseline
  34:3   warning  Property 'text-wrap' is not a widely available baseline feature               css/use-baseline
  42:3   warning  Property 'anchor-name' is not a widely available baseline feature             css/use-baseline

✖ 11 problems (0 errors, 11 warnings)
```

### Suppress individual warnings

If you're using a feature that doesn't meet your Baseline target, but you know that you're using it in a way that won't adversely affect the user experience for anyone on an unsupported browser, you can suppress the linter warning.

For example, you may decide that view transitions are a progressive enhancement and it's ok to use a property like `view-transition-name`. So to suppress ESLint's warning, go into [src/test.css](src/test.css) and add the `eslint-disable-line` comment as shown below:

```diff
-view-transition-name: card-transition;
+view-transition-name: card-transition; /* eslint-disable-line css/use-baseline */
view-transition-name: card-transition;
```

Now rerun ESLint:

```sh
npm run lint:css
```

And note that there is no longer a warning for `view-transition-name`:

```sh
   6:15  warning  Type 'color-mix' is not a widely available baseline feature                   css/use-baseline
   7:3   warning  Property 'container-type' is not a widely available baseline feature          css/use-baseline
   8:3   warning  Property 'accent-color' is not a widely available baseline feature            css/use-baseline
  16:3   warning  Property 'font-language-override' is not a widely available baseline feature  css/use-baseline
  21:17  warning  Type 'color-mix' is not a widely available baseline feature                   css/use-baseline
  26:3   warning  Property 'font-stretch' is not a widely available baseline feature            css/use-baseline
  29:11  warning  Selector 'has' is not a widely available baseline feature                     css/use-baseline
  30:3   warning  Property 'outline' is not a widely available baseline feature                 css/use-baseline
  34:3   warning  Property 'text-wrap' is not a widely available baseline feature               css/use-baseline
  42:3   warning  Property 'anchor-name' is not a widely available baseline feature             css/use-baseline

✖ 10 problems (0 errors, 10 warnings)
```

### Baseline newly available

In [eslint.config.mjs](eslint.config.mjs) change the [`available`](https://github.com/eslint/css/blob/HEAD/docs/rules/use-baseline.md#options) option of the use-baseline rule to "newly":

```js
rules: {
  "css/use-baseline": ["warn", {
    "available": "newly"
  }],
}
```

Rerun eslint:

```sh
npm run lint:css
```

Output:

```sh
   8:3  warning  Property 'accent-color' is not a newly available baseline feature            css/use-baseline
  16:3  warning  Property 'font-language-override' is not a newly available baseline feature  css/use-baseline
  26:3  warning  Property 'font-stretch' is not a newly available baseline feature            css/use-baseline
  42:3  warning  Property 'anchor-name' is not a newly available baseline feature             css/use-baseline

✖ 4 problems (0 errors, 4 warnings)
```

### Baseline year

In [eslint.config.mjs](eslint.config.mjs) change the [`available`](https://github.com/eslint/css/blob/HEAD/docs/rules/use-baseline.md#options) option of the use-baseline rule to a year in YYYY format:

```js
rules: {
  "css/use-baseline": ["warn", {
    "available": 2023
  }],
}
```

Rerun eslint:

```sh
npm run lint:css
```

Output:

```sh
   8:3  warning  Property 'accent-color' is not a 2023 available baseline feature            css/use-baseline
  16:3  warning  Property 'font-language-override' is not a 2023 available baseline feature  css/use-baseline
  26:3  warning  Property 'font-stretch' is not a 2023 available baseline feature            css/use-baseline
  34:3  warning  Property 'text-wrap' is not a 2023 available baseline feature               css/use-baseline
  42:3  warning  Property 'anchor-name' is not a 2023 available baseline feature             css/use-baseline

✖ 5 problems (0 errors, 5 warnings)
```

## html-eslint

[`html-eslint`](https://github.com/yeonjuan/html-eslint) is an ESLint plugin for HTML.

### Widely available

In [eslint.config.mjs](eslint.config.mjs), import the plugin and configure the `use-baseline` rule as needed:

```js
import html from "@html-eslint/eslint-plugin";

export default [
  // {...}
  {
    ...html.configs["flat/recommended"],
    files: ["**/*.html"],
    rules: {
      "@html-eslint/use-baseline": ["warn", {
        "available": "widely"
      }],
    },
  }
];
```

Both `eslint/css` and `html-eslint` have identical configuration options for widely available, newly available, and Baseline years.

Run eslint:

```sh
npm run lint:html
```

Output:

```sh
   58:56  warning  Attribute 'referrerpolicy="origin-when-cross-origin"' on '<a>' is not a widely available baseline feature  @html-eslint/use-baseline
   73:21  warning  Attribute 'fetchpriority' on '<img>' is not a widely available baseline feature                            @html-eslint/use-baseline
   97:13  warning  Element '<search>' is not a widely available baseline feature                                              @html-eslint/use-baseline
  106:29  warning  Attribute 'autocapitalize' is not a widely available baseline feature                                      @html-eslint/use-baseline
  133:29  warning  Attribute 'autocorrect' is not a widely available baseline feature                                         @html-eslint/use-baseline
  143:13  warning  Element '<fencedframe>' is not a widely available baseline feature                                         @html-eslint/use-baseline
  163:29  warning  Attribute 'popovertarget' on '<button>' is not a widely available baseline feature                         @html-eslint/use-baseline
  164:41  warning  Attribute 'popover' is not a widely available baseline feature                                             @html-eslint/use-baseline
  168:42  warning  Attribute 'popovertarget' on '<button>' is not a widely available baseline feature                         @html-eslint/use-baseline
  168:68  warning  Attribute 'popovertargetaction' on '<button>' is not a widely available baseline feature                   @html-eslint/use-baseline
  174:22  warning  Attribute 'inert' is not a widely available baseline feature                                               @html-eslint/use-baseline
  210:63  warning  Attribute 'translate' is not a widely available baseline feature                                           @html-eslint/use-baseline

✖ 12 problems (0 errors, 12 warnings)
```

## eslint-plugin-compat

[`eslint-plugin-compat`](https://github.com/amilajack/eslint-plugin-compat) is an ESLint plugin that validates the browser support of JavaScript features.

### Baseline widely available

This ESLint plugin relies on a browserslist config, which we can use with [browserslist-config-baseline](https://github.com/web-platform-dx/browserslist-config-baseline) to set a target of Baseline widely available.

1. Open [.browserslistrc](.browserslistrc)
2. Replace the contents with

  ```diff
  +extends browserslist-config-baseline
  ```

Run eslint:

```sh
npm run lint:js
```

Output:

```sh
   71:13  warning  PaymentRequest is not supported in Firefox 104, and_ff 137                                compat/compat
  103:1   warning  Array.toReversed() is not supported in Firefox 104, Edge 107, Chrome 107                  compat/compat
  107:1   warning  navigator.userActivation() is not supported in Safari 16.0, iOS Safari 16.0, Firefox 104  compat/compat
  115:5   warning  Intl.Segmenter() is not supported in Firefox 104                                          compat/compat
  126:1   warning  scheduler is not supported in Safari 16.0, iOS Safari 16.0                                compat/compat
  128:1   warning  IdleDetector is not supported in Safari 16.0, iOS Safari 16.0, Firefox 104, Edge 107      compat/compat
  130:1   warning  Atomics.waitAsync() is not supported in Safari 16.0, iOS Safari 16.0, Firefox 104         compat/compat

✖ 7 problems (0 errors, 7 warnings)
```

> [!NOTE]
> Unlike the other linters, this plugin precedes Baseline and so its warnings are still in terms of specific browser versions and not Baseline targets.

### Baseline year

1. Open [.browserslistrc](.browserslistrc)
2. Replace the contents with

  ```diff
  -extends browserslist-config-baseline
  +extends browserslist-config-baseline/2016
  ```

Run eslint:

```sh
npm run lint:js
```

Output:

```sh
   65:15  warning  String.padStart() is not supported in Edge 14, Chrome 53                                                        compat/compat
   68:1   warning  fetch is not supported in Safari 10                                                                             compat/compat
   71:13  warning  PaymentRequest is not supported in Safari 10, Firefox 49, Edge 14, Chrome 53, and_ff 137                        compat/compat
   74:13  warning  Object.values() is not supported in Safari 10, iOS Safari 10.0-10.2, Chrome 53                                  compat/compat
   87:1   warning  Object.fromEntries() is not supported in Safari 10, iOS Safari 10.0-10.2, Firefox 49, Edge 14, Chrome 53        compat/compat
   90:18  warning  IntersectionObserver is not supported in Safari 10, Firefox 49, Edge 14, Chrome 53                              compat/compat
  103:1   warning  Array.toReversed() is not supported in Safari 10, iOS Safari 10.0-10.2, Firefox 49, Edge 14, Chrome 53          compat/compat
  107:1   warning  navigator.userActivation() is not supported in Safari 10, iOS Safari 10.0-10.2, Firefox 49, Edge 14, Chrome 53  compat/compat
  113:1   warning  AbortSignal is not supported in Safari 10, iOS Safari 10.0-10.2, Firefox 49, Edge 14, Chrome 53                 compat/compat
  115:5   warning  Intl.Segmenter() is not supported in Safari 10, iOS Safari 10.0-10.2, Firefox 49, Edge 14, Chrome 53            compat/compat
  126:1   warning  scheduler is not supported in Safari 10, iOS Safari 10.0-10.2, Firefox 49, Edge 14, Chrome 53                   compat/compat
  128:1   warning  IdleDetector is not supported in Safari 10, iOS Safari 10.0-10.2, Firefox 49, Edge 14, Chrome 53                compat/compat
  130:1   warning  Atomics is not supported in Safari 10, iOS Safari 10.0-10.2, Firefox 49, Edge 14, Chrome 53                     compat/compat

✖ 13 problems (0 errors, 13 warnings)
```
