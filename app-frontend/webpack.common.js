const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

var apiHost = '';
let setApi = function (env) {
    if(env === 'mock') {
        apiHost = 'http://localhost:3000';
    }
    if(env === 'dev') {
        apiHost = 'https://192.168.3.143:8080/bot';
    }
    if(env === 'prod') {
        apiHost = 'https://192.168.3.143:8080';
    }

    console.log("Api Host: ", apiHost);
}


module.exports = env => {
    console.log('Current environment: ', env);
    setApi(env);
    return {
        entry: {
            controller: path.resolve(__dirname, "./src/javascript/controller.js"),
            app: path.resolve(__dirname, "./src/javascript/app.js")
        },

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].bundle.js"
        },

        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css"},
                    {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react']
                    }
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: "controller.html",
                template: "./src/html/controller.html",
                inject: false
            }),
            new HtmlWebpackPlugin({
                filename: "app.html",
                template: "./src/html/app.html",
                inject: false
            }),
            new webpack.DefinePlugin({
                'process.env.apiHost': JSON.stringify(apiHost)
            })
        ],

        resolve: {
            extensions: ['', '.js', '.jsx']
        },
    };
};
