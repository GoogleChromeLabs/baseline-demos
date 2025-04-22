# Baseline demo: Stylelint

## Setup

```sh
npm i
```

## stylelint-plugin-use-baseline

While Stylelint does not yet have built-in support for Baseline, the [`stylelint-plugin-use-baseline`](https://github.com/ryo-manba/stylelint-plugin-use-baseline) plugin adds a linting rule similar to ESLint's.

### Baseline Widely available

```sh
npx stylelint src/test.css
```

Output:

```sh
src/test.css
   7:3   ✖  Property "container-type" is not a widely available baseline feature. (plugin/use-baseline)
   8:3   ✖  Property "accent-color" is not a widely available baseline feature. (plugin/use-baseline)
  14:3   ✖  Property "overflow" is not a widely available baseline feature. (plugin/use-baseline)
  15:3   ✖  Property "view-transition-name" is not a widely available baseline feature. (plugin/use-baseline)
  16:3   ✖  Property "font-language-override" is not a widely available baseline feature. (plugin/use-baseline)
  29:11  ✖  Selector "has" is not a widely available baseline feature. (plugin/use-baseline)
  30:3   ✖  Property "outline" is not a widely available baseline feature. (plugin/use-baseline)
  34:3   ✖  Property "text-wrap" is not a widely available baseline feature. (plugin/use-baseline)
  42:3   ✖  Property "anchor-name" is not a widely available baseline feature. (plugin/use-baseline)

✖ 9 problems (9 errors, 0 warnings)
```

### Baseline Newly available

In [.stylelintrc.json](.stylelintrc.json) change the `available` option of the require-baseline rule to "newly":

```js
"rules": {
  "plugin/require-baseline": [
    true,
    {
      "available": "newly"
    }
  ]
}
```

Rerun Stylelint:

```sh
npx stylelint src/test.css
```

Output:

```sh
src/test.css
   8:3  ✖  Property "accent-color" is not a newly available baseline feature. (plugin/use-baseline)
  15:3  ✖  Property "view-transition-name" is not a newly available baseline feature. (plugin/use-baseline)
  16:3  ✖  Property "font-language-override" is not a newly available baseline feature. (plugin/use-baseline)
  42:3  ✖  Property "anchor-name" is not a newly available baseline feature. (plugin/use-baseline)

✖ 4 problems (4 errors, 0 warnings)
```

### Baseline year

In [.stylelintrc.json](.stylelintrc.json) change the `available` option of the require-baseline rule to a year in YYYY format:

```js
"rules": {
  "plugin/require-baseline": [
    true,
    {
      "available": 2023
    }
  ]
}
```

Rerun Stylelint:

```sh
npx stylelint src/test.css
```

Output:

```sh
src/test.css
   8:3  ✖  Property "accent-color" is not a 2023 available baseline feature. (plugin/use-baseline)
  15:3  ✖  Property "view-transition-name" is not a 2023 available baseline feature. (plugin/use-baseline)
  16:3  ✖  Property "font-language-override" is not a 2023 available baseline feature. (plugin/use-baseline)
  34:3  ✖  Property "text-wrap" is not a 2023 available baseline feature. (plugin/use-baseline)
  42:3  ✖  Property "anchor-name" is not a 2023 available baseline feature. (plugin/use-baseline)

✖ 5 problems (5 errors, 0 warnings)
```
