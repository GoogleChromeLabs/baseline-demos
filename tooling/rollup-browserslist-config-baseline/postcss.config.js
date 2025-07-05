/* eslint-disable */

// Helpers
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const isProd = mode === "production";

const plugins = [
  require("autoprefixer")
];

if (isProd) {
  plugins.push(require("cssnano"));
}

module.exports = {
  plugins
};
