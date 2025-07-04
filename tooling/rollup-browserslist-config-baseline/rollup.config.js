import { rollupPluginHTML as html } from "@web/rollup-plugin-html";
import { babel } from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { importMetaAssets } from "@web/rollup-plugin-import-meta-assets";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.html",
  output: {
    dir: "dist",
    format: "es"
  },
  jsx: {
    preset: "react-jsx"
  },
  plugins: [
    resolve({
      runtime: "automatic",
      extensions: [".js", ".jsx"]
    }),
    commonjs(),
    babel({
      extensions: [".js", ".jsx"]
    }),
    replace({
       preventAssignment: false,
       'process.env.NODE_ENV': '"development"'
    }),
    postcss({
      extract: true
    }),
    html(),
    importMetaAssets()
  ]
}
