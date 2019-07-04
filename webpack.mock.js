/* eslint-disable */
// Disaling LINT for CommonsJS
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js')('MOCK');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

let currEnv = 'MOCK';

const config = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.currEnv': JSON.stringify(currEnv),
    }),
    new CopyWebpackPlugin([
      { from: './node_modules/sms-dev-mock-client/dist', to: '' },
    ]),
   ]
};

module.exports = merge(commonConfig,config, {
  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    inline: true,
    port: 5000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  }
});
