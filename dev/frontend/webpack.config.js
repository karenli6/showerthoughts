const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : './src/index.js',
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
    },
    plugins : [
        new HtmlWebpackPlugin({
            title : 'development',
            template : './src/index.html',
        }),
    ],
    devServer : {
        static : './build',
        port : 9001,
    },
    output : {
        path : path.resolve(__dirname, 'build'),
        filename : 'bundle.js',
        clean : true,
    },
};