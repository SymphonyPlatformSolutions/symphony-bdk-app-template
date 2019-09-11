/* eslint-disable */
// Disaling LINT for CommonsJS
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js')('MOCK');
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
      { from: './extension-app/public/bundle.json', to: '' },
    ]),
    new CopyWebpackPlugin([
      { from: './node_modules/sms-dev-tool-mock-client/dist', to: '' },
    ]),
  ]
};

module.exports = merge(commonConfig,config, {
  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    inline: true,
    port: 4000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  }
});
