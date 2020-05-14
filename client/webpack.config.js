const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PORT, HOST } = require('./config');

const SRC_DIR = path.resolve(__dirname, 'src');
// const PUBLIC_DIR = path.resolve(__dirname, 'public');

const CSS_DIR = 'assets/css';
// const JS_DIR = 'assets/js';

const wpconfig = {
    entry: `${SRC_DIR}/index.js`,

    // output: {
    //     path: PUBLIC_DIR,
    //     filename: `index_bundle.js`,
    // },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: SRC_DIR,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    devServer: {
        port: PORT,
        host: HOST,
        hot: true, // Activate hot loading
        historyApiFallback: true, // Webpack Dev Server to redirect all server requests to index.html.
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${SRC_DIR}/index.html`,
        }),
        new MiniCssExtractPlugin({
            filename: `${CSS_DIR}/[name]-[hash].css`,
            chunkFilename: `${CSS_DIR}/[id]-[hash].css`,
        }),
    ],
    // Necessary for file changes inside the bind mount to get picked up
    watchOptions: {
        aggregateTimeout: 300,
        poll: true,
    },
};

module.exports = wpconfig;
