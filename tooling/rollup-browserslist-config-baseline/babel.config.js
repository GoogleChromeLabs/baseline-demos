/* eslint-disable */

module.exports = {
  exclude: 'node_modules/**',
  presets: [
    [
      "@babel/preset-env", {
        modules: false,
        useBuiltIns: "usage",
        corejs: "3.43.0"
      }
    ],
    [
      "@babel/preset-react", {
        runtime: "automatic"
      }
    ]
  ]
};
