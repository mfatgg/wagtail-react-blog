const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.base");

module.exports = (env) => {
  const config = require(
    `./webpack.${env.production ? "production" : "development"}`
  );
  return merge(baseConfig, config);
};
