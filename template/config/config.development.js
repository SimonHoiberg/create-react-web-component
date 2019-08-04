const merge = require('webpack-merge');
const webpackConfig = require('../webpack.config');

module.exports = merge(webpackConfig, {
  devServer: {
    port: 3000,
    open: true
  },
  mode: 'development',
});