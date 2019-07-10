/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.common.js')('prod');

const PATH = path.resolve(`${__dirname}/dist/`, '');

module.exports = merge(commonConfig, {
  mode: 'production',

  output: {
    path: PATH,
    filename: '[name].bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|bower_components|\.spec\.js)/,
        use: [
        {
          loader: 'webpack-strip-block'
        }
      ]
    }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true,
          ecma: 6
        }
      })
    ]
  },
});
