const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    devServer: {                       //provide the fulll localtion on the process object in order to reference it
        host: 'localhost',
        port: 8080,
        static: {
            directory: path.resolve(__dirname, 'build'),
            publicPath: '/'
        },
        hot: true,
        open: true,

        // historyApiFallback: true,
        // headers: { 'Access-Control-Allow-Origin': '*' },
        // proxy: {
        //     '/api/**': {
        //         target: 'http//localhost:3000/',
        //         secure: false,
        //     },
        //     '.assets/**': {
        //         target: 'http://localhost:3000',
        //         secure: false
        //     }
        // }
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
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/template.html'), // template file
            filename: 'index.html', // output file
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
}