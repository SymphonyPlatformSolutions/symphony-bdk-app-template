const webpack = require('webpack');
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.common.js')('prod')

module.exports = merge(commonConfig, {
    mode: 'production',

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: {
        test: /\.css$/,

      },
    },

    plugins: [
        // Extract imported CSS into own file
        // new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
        // Minify JS
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: true,
        }),
        // Minify CSS
        // new webpack.LoaderOptionsPlugin({
        //     minimize: true,
        // }),
    ],
});
