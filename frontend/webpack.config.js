const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const developmentConfig = require("./webpack.development.js");
const productionConfig = require("./webpack.production.js");

module.exports = (env) =>
  merge(baseConfig, env.production ? productionConfig : developmentConfig);
