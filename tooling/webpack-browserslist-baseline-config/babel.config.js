/* eslint-disable */

module.exports = {
  presets: [
    [
      "@babel/preset-env", {
        modules: false,
        useBuiltIns: "usage",
        corejs: "3.43.0",
        debug: true
      }
    ],
    [
      "@babel/preset-react", {
        runtime: "automatic"
      }
    ]
  ]
};
