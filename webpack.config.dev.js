const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');
const dontenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),

        }
    },
    module: {
        rules: [
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css|.styl$/i,
            use: [miniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
            ],
        },
        {
            test: /\.png/,
            type: 'asset/resource'
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
            generator: {
                filename: "assets/fonts/[hash][ext]",
            },
        }
    ]
},
plugins: [
    new htmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
        filename: './index.html'
    }),
    new miniCssExtractPlugin({
        filename: 'assets/[name].[contenthash].css'
    }),
    new copyPlugin({
        patterns: [
            {
                from: path.resolve(__dirname,"src", "assets/images"),
                to: "assets/images"

            }
        ]
    }),
    new dontenv(),
]

}