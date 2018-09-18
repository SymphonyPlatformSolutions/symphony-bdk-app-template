/* eslint-disable */
// Disaling LINT for CommonsJS
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// These configurations depends on how your server, 
// app(javascript folder) and controller(javascript folder) are configured.
var apiHost = '';
let setApi = function (env) {
  if (env === 'mock') {
    apiHost = 'http://localhost:3000';
  }
  if (env === 'dev') {
    apiHost = 'https://192.168.3.143:8080/bot';
  }
  if (env === 'prod') {
    apiHost = 'https://192.168.3.143:8080';
  }
  console.log('Api Host: ', apiHost);
}

module.exports = env => {
  console.log('Current environment: ', env);
  setApi(env);
  return {
    entry: {
      controller: path.resolve(__dirname, './src/javascript/controller.js'),
      app: path.resolve(__dirname, './src/javascript/app.js')
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }]
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react', 'stage-2']
          }
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.jsx']
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'controller.html',
        template: './src/html/controller.html',
        inject: false
      }),
      new HtmlWebpackPlugin({
        filename: 'app.html',
        template: './src/html/app.html',
        inject: false
      }),
      new webpack.DefinePlugin({
        'process.env.apiHost': JSON.stringify(apiHost)
      }),
    ],
  };
};
