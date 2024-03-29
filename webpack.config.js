//const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require('path');
const dotenv = require('dotenv').config({
    path: path.join(__dirname, '.env')
});

module.exports = {
    entry: {
        main: '/Users/mcphail.alex/codesmith/53/Solo Project/Solo-project/client/src/index.js',
    },
    output: {
        path: '/Users/mcphail.alex/codesmith/53/Solo Project/Solo-project/build',
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    devServer: {                       //provide the fulll localtion on the process object in order to reference it
        host: 'localhost',
        port: 8080,
        static: {
            directory: '/Users/mcphail.alex/codesmith/53/Solo Project/Solo-project/build',
            publicPath: '/'
        },
        hot: true,
        open: true,

        // historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        proxy: {
            '/api/**': { "target": "http://localhost:3000/", "secure": false }

            //     '.assets/**': {
            //         target: 'http://localhost:3000',
            //         secure: false
            //     }
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /.(css|scss)$/,
                exclude: [/node_modules/, /client\/scss\/modules/],
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            // Images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                use: [{
                    loader: 'file-loader',
                }]
            },
            // {
            //     test: /\.(jpg|png|jpeg)$/,
            //     use: {
            //         loader: 'url-loader',
            //     }
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: '/Users/mcphail.alex/codesmith/53/Solo Project/Solo-project/client/template.html', // template file
            filename: 'index.html', // output file
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new NodePolyfillPlugin(),
        new webpack.DefinePlugin({
            "process.env" : dotenv.parsed
        }),
    ],
    node: {
        //fs: "empty",
        //net: "empty",
        global: false,
        __filename: false,
        __dirname: false
    },
    resolve: {
        fallback: {
            fs: false
        }
    }
}