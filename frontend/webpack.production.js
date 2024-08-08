const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  output: {
    filename: "index_bundle.js",
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new Dotenv({
      path: ".env.production",
    }),
  ],
};
