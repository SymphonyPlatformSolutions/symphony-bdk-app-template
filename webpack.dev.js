/* eslint-disable */
// Disaling LINT for CommonsJS
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js')('dev');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin([
      { from: './extension-app/public/bundle.json', to: '' },
    ]),
  ],

  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: 4000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true,
  }
});
