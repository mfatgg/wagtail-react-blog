import Dotenv from "dotenv-webpack";

export default {
  mode: "production",
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
