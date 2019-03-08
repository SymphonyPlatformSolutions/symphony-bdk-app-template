const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js')('dev');

module.exports = merge(commonConfig, {
  mode: 'development',

  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }],
  },

  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: 4000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
  },
});
