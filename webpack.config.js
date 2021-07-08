const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "/src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      // {
      //   test: /\.css$/i,
      //   use: ["style-loader", "css-loader", "postcss-loader"],
      // },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};