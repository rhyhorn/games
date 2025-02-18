const { merge } = require('webpack-merge');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');
const path = require('path');

module.exports = (env) => {
  return merge(common, {
    mode: 'production',
    entry: `./src/${env.project}/index.ts`,
    output: {
      path: path.resolve(__dirname, `dist/${env.project}`),
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [new CompressionWebpackPlugin()],
  });
};
