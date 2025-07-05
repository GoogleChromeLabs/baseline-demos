/* eslint-disable */

// Vendors
import { rollupPluginHTML as html } from "@web/rollup-plugin-html";
import { babel } from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { importMetaAssets } from "@web/rollup-plugin-import-meta-assets";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";

// Build helpers
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const isProd = mode === "production";

// Construct Rollup plugins
const plugins = [
  postcss({
    extract: true
  }),
  html({
    output: {
      dir: "dist"
    },
    minify: isProd,
    publicPath: "/",
    extractAssets: true,
    bundleAssetsFromCss: true
  }),
  resolve(),
  commonjs(),
  babel({
    babelHelpers: "bundled"
  }),
  importMetaAssets()
];

if (isProd) {
  plugins.push(terser(), replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true
  }));
}

// Rollup config
export default {
  input: "src/index.html",
  output: {
    dir: "dist",
    format: "es",
    assetFileNames: isProd ? "assets/[name].[hash:8].[ext]" : "assets/[name].[ext]",
    chunkFileNames: isProd ? "[name].[hash:8].js" : "[name].js"
  },
  plugins
}
