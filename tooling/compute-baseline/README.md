# compute-baseline

The `compute-baseline` package is maintained by the WebDX Community Group and enables tooling providers to look up the Baseline status of any individual `@mdn/browser-compat-data` (BCD) key or list of keys.

## Setup

```sh
npm i
```

## Get the Baseline status for a BCD key

Update [index.js](index.js) with the BCD key of interest:

```js
const bcdKey = 'css.properties.outline';
```

Run the script:

```sh
node index.js
```

Output:

```json
{
  "baseline": "low",
  "baseline_low_date": "2023-03-27",
  "support": {
    "chrome": "94",
    "chrome_android": "94",
    "edge": "94",
    "firefox": "88",
    "firefox_android": "88",
    "safari": "16.4",
    "safari_ios": "16.4"
  }
}
```

