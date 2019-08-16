const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const urlPath = isProduction ? process.env.PUBLIC_PATH : '';

module.exports = {
  entry: resolve(__dirname, './src/index.tsx'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: '%component-name-pascal%.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'to-string-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|otf|ico|mp4)(\?\S*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/',
            publicPath: `${urlPath}assets/`,
            name: '[folder]/[name].[ext]',
            cachecDirectory: true,
          }
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Basic Widget',
      template: './public/index.html',
      inject: 'head',
    }),
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
  ],
};
