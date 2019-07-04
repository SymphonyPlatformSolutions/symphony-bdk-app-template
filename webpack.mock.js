/* eslint-disable */
// Disaling LINT for CommonsJS
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js')('MOCK');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

let currEnv = 'MOCK';

console.log('Current environment: ', currEnv);

const ESMRequire = require('esm')(module);
const { ENRICHER_EVENTS } = ESMRequire('./extension-app/services/enrichers/entities');
const { MODAL_IDS } = ESMRequire('./extension-app/utils/system/app-constants');
console.log(ENRICHER_EVENTS, MODAL_IDS);

const buildPluginObject = (target) => {
  Object.keys(target).forEach(key => {
    target[key] = JSON.stringify(target[key]);
  });
  console.log(target);
  return target;
}


const config = {
  plugins: [
    new webpack.DefinePlugin({
      ENRICHER_EVENTS: JSON.stringify(ENRICHER_EVENTS)
    }),
    new webpack.DefinePlugin({
      MODAL_IDS: JSON.stringify(MODAL_IDS)
    }),
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
    port: 4000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  }
});
