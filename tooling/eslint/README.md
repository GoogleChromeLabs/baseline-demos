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
   6:15  warning  Type 'color-mix' is not a widely available baseline feature                     css/use-baseline
   7:3   warning  Property 'container-type' is not a widely available baseline feature            css/use-baseline
   8:3   warning  Property 'accent-color' is not a widely available baseline feature              css/use-baseline
  14:13  warning  Value 'clip' of property 'overflow' is not a widely available baseline feature  css/use-baseline
  16:3   warning  Property 'font-language-override' is not a widely available baseline feature    css/use-baseline
  21:17  warning  Type 'color-mix' is not a widely available baseline feature                     css/use-baseline
  26:3   warning  Property 'font-stretch' is not a widely available baseline feature              css/use-baseline
  29:11  warning  Selector 'has' is not a widely available baseline feature                       css/use-baseline
  30:3   warning  Property 'outline' is not a widely available baseline feature                   css/use-baseline
  34:3   warning  Property 'text-wrap' is not a widely available baseline feature                 css/use-baseline
  42:3   warning  Property 'anchor-name' is not a widely available baseline feature               css/use-baseline

✖ 11 problems (0 errors, 11 warnings)
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
