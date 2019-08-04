const merge = require('webpack-merge');
const webpackConfig = require('../webpack.config');
const { ProvidePlugin, EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: 'none',

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 5,
          warnings: false,
          parse: {},
          compress: {
            toplevel: true,
            unused: true,
            dead_code: true,
            drop_console: true,
          },
          mangle: true,
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
    runtimeChunk: false,
  },

  plugins: [
    new EnvironmentPlugin({ NODE_ENV: 'production' }),
    new HashedModuleIdsPlugin(),
    new ProvidePlugin({
      Promise: 'es6-promise',
      Symbol: 'es6-symbol',
    }),
  ],
});
