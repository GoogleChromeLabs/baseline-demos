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


## eslint-plugin-baseline-js

[`eslint-plugin-baseline-js`](https://github.com/3ru/eslint-plugin-baseline-js) is an ESLint plugin for JavaScript Baseline.

### Widely available

In [eslint.config.mjs](eslint.config.mjs), import the plugin and configure the `use-baseline` rule as needed:

```js
import js from "eslint-plugin-baseline-js";

export default [
  // {...}
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
  }
];
```

Run eslint:

```sh
npm run lint:js
```

Output:

```sh
   71:17  warning  Feature 'payment-request' is not a widely available Baseline feature            baseline-js/use-baseline
  107:11  warning  Feature 'user-activation' is not a widely available Baseline feature            baseline-js/use-baseline
  109:7   warning  Feature 'array-fromasync' is not a widely available Baseline feature            baseline-js/use-baseline
  111:8   warning  Feature 'array-group' is not a widely available Baseline feature                baseline-js/use-baseline
  113:13  warning  Feature 'abortsignal-any' is not a widely available Baseline feature            baseline-js/use-baseline
  115:10  warning  Feature 'intl-segmenter' is not a widely available Baseline feature             baseline-js/use-baseline
  120:7   warning  Feature 'is-error' is not a widely available Baseline feature                   baseline-js/use-baseline
  124:6   warning  Feature 'math-sum-precise' is not a widely available Baseline feature           baseline-js/use-baseline
  128:14  warning  Feature 'idle-detection' is not a widely available Baseline feature             baseline-js/use-baseline
  130:1   warning  Feature 'atomics-wait-async' is not a widely available Baseline feature         baseline-js/use-baseline
  132:5   warning  Feature 'numeric-factory-functions' is not a widely available Baseline feature  baseline-js/use-baseline

✖ 11 problems (0 errors, 11 warnings)
```

### Baseline newly available

In [eslint.config.mjs](eslint.config.mjs) change the `available` option to "newly":

```js
rules: {
  "baseline-js/use-baseline": ["warn", {
    "available": "newly"
  }],
}
```

### Baseline year

In [eslint.config.mjs](eslint.config.mjs) change the `available` option to a year in YYYY format:

```js
rules: {
  "baseline-js/use-baseline": ["warn", {
    "available": 2020
  }],
}
```
