/* eslint-disable */
// Disabling LINT for CommonsJS
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// These configurations depends on how your server, 
// app(javascript folder) and controller(javascript folder) are configured.
let appEntry = '';
let controllerEntry = '';
let setApi = function (env) {
  if(env === 'mock') {
    controllerEntry = './mock-js/controller-mock.js';
    appEntry = './mock-js/app-mock.js';
  }
  if(env === 'dev') {
      controllerEntry = './src/javascript/controller.js';
      appEntry = './src/javascript/app.js';
  }
  if(env === 'prod') {
      controllerEntry = './src/javascript/controller.js';
      appEntry = './src/javascript/app.js';
  }
}

module.exports = env => {
  console.log('Current environment: ', env);
  setApi(env);
  return {
    entry: {
      controller: path.resolve(__dirname, controllerEntry),
      app: path.resolve(__dirname, appEntry)
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
      // new webpack.DefinePlugin({
      //   'process.env.apiHost': JSON.stringify(apiHost)
      // }),
    ],
  };
};
