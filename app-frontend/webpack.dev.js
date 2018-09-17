const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js')('dev');
const path = require('path');

module.exports = merge(commonConfig, {
    mode: 'dev',
    devtool: 'eval-source-map',

    module: {

        rules: [
            {
              test: /\.css$/
            },
      ],
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
      },

    devServer: {
        inline: true,
        contentBase: path.resolve(__dirname, "dist"),
        port: 4000,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
});
