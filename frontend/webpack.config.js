const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  const isProduction = env.NODE_ENV === "production";
  const dotenvFilename = isProduction ? ".env.production" : ".env.development";

  return {
    entry: "./src/index.js",
    mode: "development",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "index_bundle.js",
    },
    target: "web",
    devServer: {
      port: "5000",
      static: {
        directory: path.join(__dirname, "public"),
      },
      open: true,
      hot: true,
      liveReload: true,
    },
    devtool: "eval-source-map",
    resolve: {
      extensions: [".js", ".jsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
      new Dotenv({
        path: dotenvFilename,
      }),
    ],
  };
};
