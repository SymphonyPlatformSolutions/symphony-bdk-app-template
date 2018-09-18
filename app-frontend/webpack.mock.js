/* eslint-disable */
// Disaling LINT for CommonsJS
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js')('mock');
const path = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',

  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, ],
  },

  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: 4000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});
