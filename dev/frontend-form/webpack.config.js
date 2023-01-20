const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackWatchPlugin = require('webpack-watch-files-plugin').default;

module.exports = {
    entry : './src/index.jsx',
    mode : 'development',
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader',
                },
            },
            {
                test : /\.css$/i,
                use : [ 'style-loader', 'css-loader' ],
            }
        ],
    },
    resolve : {
        modules : [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        alias : {
            react : path.join(__dirname, 'node_modules', 'react'),
        },
        extensions : [ '.js', '.jsx', '.css' ],
    },
    output : {
        path : path.resolve(__dirname, 'public'),
        filename : 'bundle.js',
        publicPath : 'auto',
        clean : true,
    },
    plugins : [
        new HtmlWebpackPlugin({
            title : 'development',
            template : './index.html',
        }),
        new WebpackWatchPlugin({
            files : [
                '.src/*.jsx',
                '*.css'
            ]
        }),
    ],
    watchOptions : {
        aggregateTimeout : 1000,
        poll: 5000,
    },
    devServer : {
        static : './public',
        hot : true,
    },
};