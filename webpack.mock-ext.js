/* eslint-disable */
// Disaling LINT for CommonsJS
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

let currEnv = 'MOCK_EXT';

const appEntry = './extension-app/app.js';
const controllerEntry = './extension-app/controller.js';

console.log('Current environment: ', currEnv);

const config = {
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
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.hbs$/, loader: 'raw-loader' },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'controller.html',
      template: './extension-app/public/controller.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'app.html',
      template: './extension-app/public/app.html',
      inject: false,
    }),
    new webpack.DefinePlugin({
      'process.env.currEnv': JSON.stringify(currEnv),
    }),
  ],
};



module.exports = merge(config, {
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
