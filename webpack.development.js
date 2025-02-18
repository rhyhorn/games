const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = (env) => {
  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: `./src/${env.project}/index.ts`,
    devServer: {
      static: {
        directory: './dist',
      },
    },
  });
};
