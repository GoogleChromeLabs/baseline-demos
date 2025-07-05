# Baseline demo: `browserslist-config-baseline` with Rollup

This demo shows how a (very) simple React app can be built with [Rollup](https://rollupjs.org/) while using the [`browserslist-config-baseline` config](https://www.npmjs.com/package/browserslist-config-baseline) to specify a Baseline-based [Browserslist](https://browsersl.ist/) target.

This demo uses:

- [Rollup](https://rollupjs.org/)
- [Babel](https://babeljs.io/)
  - [`@babel/preset-env`](http://babeljs.io/docs/babel-preset-env)
  - [`@babel/preset-react`](http://babeljs.io/docs/babel-preset-react)
  - [`core-js`](https://www.npmjs.com/package/core-js)
- [PostCSS](https://postcss.org/)
  - [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
- [Browserslist](https://browsersl.ist/)
  - [`browserslist-config-baseline`](https://www.npmjs.com/package/browserslist-config-baseline)

## Setup

First, clone this repo:

```
git clone git@github.com:GoogleChromeLabs/baseline-demos.git
```

Then navigate into the directory containing this demo:

```
cd baseline-demos/tooling/rollup-browserslist-baseline-config
```

Install npm packages:

```
npm i
```

To see the app, run this:

```
npm start
```

Then navigate to [http://localhost:8080](http://localhost:8080() on your local machine. This demo is just for illustrative purposes, and the big thing you'll want to do is see how various Baseline targets provided by `browserslist-baseline-config` influence things like code size and the targeted environments.

## See how changing your Baseline target changes your code

`browserslist-config-baseline` can specify a number of Baseline-based configs through the Browserslist `extends` syntax. In `package.json`, you can target Baseline Widely available like so:

```js
"browserslist": "extends browserslist-config-baseline"
```

However, you can specify a year (back to 2016) as a fixed target using the following format:

```js
"browserslist": "extends browserslist-config-baseline/2020"
```

This project defaults to the Widely available target. Try building the project:

```
npm run build
```

`package.json` specifies another key for `browserslist-config-baseline` to influence the console output. That key is `browserslist-config-baseline`, which takes an object of options. The specified option is `logConfigToConsole`, which is specified as `true` so that the target browsers are logged to the console.

### Baseline Widely available

The default Browserslist config for this project is `extends browserslist-config-baseline`, which targets Baseline Widely available. When building the project initially using this target, here's the list of browsers that gets passed to Browserslist:

```
Your browserslist config from browserslist-config-baseline is:
[
  'Chrome >= 108',
  'ChromeAndroid >= 108',
  'Edge >= 108',
  'Firefox >= 108',
  'FirefoxAndroid >= 108',
  'Safari >= 16',
  'iOS >= 16'
]
```

### Baseline 2016

Now try changing the Browserslist in `package.json` to use the 2016 target:

```js
"browserslist": "extends browserslist-config-baseline/2016"
```

Now rebuild:

```
npm run build
```

Notice how the list of browsers passed to Browserslist changes:

```
Your browserslist config from browserslist-config-baseline is:
[
  'Chrome >= 53',
  'ChromeAndroid >= 53',
  'Edge >= 14',
  'Firefox >= 49',
  'FirefoxAndroid >= 49',
  'Safari >= 10',
  'iOS >= 10'
]
```

As you might guess, these changes have an effect on output size:

- Baseline Widely available:
  - JavaScript bundle size: `213.9 KiB`
- Baseline 2016:
  - JavaScript bundle size: `245.5 KiB`

Performance isn't the only consideration here, but selecting a Baseline target can influence performance depending on your app's requirements and what polyfills and transforms it needs to function based on the target you set.
