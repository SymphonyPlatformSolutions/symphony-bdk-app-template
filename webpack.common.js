const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

let appEntry = '';
let controllerEntry = '';
let currEnv = '';
const setApi = (env) => {
  if (env === 'mock') {
    controllerEntry = './javascript-mock/controller-mock.js';
    appEntry = './javascript-mock/app-mock.js';
    currEnv = 'MOCK';
  }
  if (env === 'dev') {
    controllerEntry = './src/javascript/controller.js';
    appEntry = './src/javascript/app.js';
    currEnv = 'DEV';
  }
  if (env === 'prod') {
    controllerEntry = './src/javascript/controller.js';
    appEntry = './src/javascript/app.js';
    currEnv = 'PROD';
  }
};

module.exports = (env) => {
  console.log('Current environment: ', env);
  setApi(env);
  return {
    entry: {
      controller: path.resolve(__dirname, controllerEntry),
      app: path.resolve(__dirname, appEntry),
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
              limit: 81920,
            },
          }],
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['@babel/react', '@babel/preset-env'],
          },
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'controller.html',
        template: './src/html/controller.html',
        inject: false,
      }),
      new HtmlWebpackPlugin({
        filename: 'app.html',
        template: './src/html/app.html',
        inject: false,
      }),
      new webpack.DefinePlugin({
        'process.env.currEnv': JSON.stringify(currEnv),
      }),
      new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' },
      ]),
    ],
  };
};
