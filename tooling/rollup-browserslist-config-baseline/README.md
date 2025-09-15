# Rollup

This demo shows how a (very) simple React app can be built with [Rollup](https://rollupjs.org/) while using the built-in Baseline support in [Browserslist](https://browsersl.ist/) to specify a Baseline target.

This demo uses:

- [Rollup](https://rollupjs.org/)
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
cd baseline-demos/tooling/rollup-browserslist-config-baseline
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

Browserslist now has built-in support for Baseline targets. In `package.json`, you can target Baseline widely available like so:

```js
"browserslist": "baseline widely available"
```

However, you can specify a year (back to 2016) as a fixed target using the following format:

```js
"browserslist": "baseline 2020"
```

This project defaults to the Baseline widely available target. Try building the project to see different bundle sizes based on your Baseline target.

```
npm run build
```

Check the output in the `dist/` folder to see the bundle size and examine the generated JavaScript and CSS.

### Baseline Widely available

The default Browserslist config for this project is `baseline widely available`, which targets Baseline Widely available. When building the project initially using this target, you can see the modern browsers that get targeted by running:

```
npx browserslist
```

This will show you the list of browsers that Baseline widely available supports, focusing on recent versions of major browsers where widely supported features are available.

### Baseline 2016

Now try changing the Browserslist in `package.json` to use the 2016 target:

```js
"browserslist": "baseline 2016"
```

You can see how the list of browsers changes by running:

```
npx browserslist
```

This will show you the much older browser versions that were current when Baseline 2016 was established, requiring more polyfills and transformations.

Now rebuild:

```
npm run build
```

As you might guess, these changes have an effect on output size:

- Baseline Widely available:
  - JavaScript bundle size: `213.9 KiB`
- Baseline 2016:
  - JavaScript bundle size: `245.5 KiB`

Performance isn't the only consideration here, but selecting a Baseline target can influence performance depending on your app's requirements and what polyfills and transforms it needs to function based on the target you set.
