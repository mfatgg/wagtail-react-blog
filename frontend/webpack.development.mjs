import Dotenv from "dotenv-webpack";

export default {
  mode: "development",
  devServer: {
    port: "5000",
    static: {
      directory: "./public",
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
