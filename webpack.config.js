const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        publicPath: '/dist/',
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'index.template.html',
        }),
        new VueLoaderPlugin(),
    ],
};