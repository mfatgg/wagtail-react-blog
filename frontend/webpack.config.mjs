import { merge } from "webpack-merge";
import baseConfig from "./webpack.base.mjs";
import developmentConfig from "./webpack.development.mjs";
import productionConfig from "./webpack.production.mjs";

export default (env) =>
  merge(baseConfig, env.production ? productionConfig : developmentConfig);
