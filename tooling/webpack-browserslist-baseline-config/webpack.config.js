/* eslint-disable */

// Node internals
const path = require("path");

// Build helpers
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const isProd = mode === "production";

// webpack plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// webpack config
const webpackConfig = {
  mode,
  name: "jwst-gallery",
  entry: {
    home: "./src/main.jsx"
  },
  output: {
    filename: isProd ? "js/[name].[chunkhash:8].js" : "js/[name].js",
    chunkFilename: isProd ? "js/[name].[chunkhash:8].js" : "js/[name].js",
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/"
  },
  devtool: isProd ? "hidden-source-map" : "source-map",
  module: {
    rules: [
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/i,
        use: [
          {
            loader: "babel-loader",
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: `img/${isProd ? "[name].[hash:8][ext]": "[name][ext]"}`
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/${isProd ? "[name].[contenthash:8].css" : "[name].css"}`,
      chunkFilename: `css/${isProd ? "[name].[contenthash:8].css" : "[name].css"}`
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ],
  stats: {
    exclude: /\.(map$|jpe?g)/i,
    excludeAssets: /\.(map$|jpe?g)/i,
    excludeModules: /\.(map$|jpe?g)/i,
    builtAt: false,
    children: false,
    modules: false
  },
  performance: {
    maxAssetSize: 2**20
  }
};

// Export the config
module.exports = webpackConfig
