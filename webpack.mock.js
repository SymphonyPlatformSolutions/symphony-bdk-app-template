/* eslint-disable */
// Disaling LINT for CommonsJS
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const appEntry = './symphony-wrapper/mock/app-mock.js';
const controllerEntry = './symphony-wrapper/mock/controller-mock.js';
let wrapperEntry = './symphony-wrapper/wrapper.js';
let currEnv = 'MOCK';
const rendererEntry = './symphony-wrapper/renderer-mock.js';

console.log('Current environment: ', currEnv);

const config = {
  entry: {
    controller: path.resolve(__dirname, controllerEntry),
    app: path.resolve(__dirname, appEntry),
    wrapper: path.resolve(__dirname, wrapperEntry),
    renderer: path.resolve(__dirname, rendererEntry),
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
      { test: /\.hbs$/, loader: 'raw-loader' },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './symphony-wrapper/index.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'renderer-app.html',
      template: './symphony-wrapper/mock/renderer-app.html',
      inject: false,
    }),
    new webpack.DefinePlugin({
      'process.env.currEnv': JSON.stringify(currEnv),
    }),
    new CopyWebpackPlugin([
      { from: 'symphony-wrapper/assets', to: 'assets' },
      { from: 'extension-app/public/assets', to: 'assets' },
    ]),
    new CopyWebpackPlugin([
      { from: 'symphony-wrapper/assets/sass/fonts', to: 'fonts' },
    ]),
    new CopyWebpackPlugin([
      { from: 'symphony-wrapper/bundle.json', to: '' },
    ]),
    new CopyWebpackPlugin([
      { from: 'symphony-wrapper/renderer.js', to: '' },
    ]),
    new CopyWebpackPlugin([
      { from: 'symphony-wrapper/default-entities.js', to: '' },
    ]),
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
