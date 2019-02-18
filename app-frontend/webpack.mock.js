const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js')('mock');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',

  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }],
  },

  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'javascript-mock'),
    port: 4000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
