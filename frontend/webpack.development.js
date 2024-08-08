const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  mode: "development",
  output: {
    filename: "index_bundle.js",
  },
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
  plugins: [
    new Dotenv({
      path: ".env.development",
    }),
  ],
};
