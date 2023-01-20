const path = require('path');

module.exports = {
    entry : path.resolve(__dirname, 'js', 'index.jsx'),
    mode : 'development',
    target : 'web',
    output : {
        path : path.resolve('../public'),
        filename : 'bundle.js',
        publicPath : path.resolve('../public'),
    },
    resolve : {
        extensions : [ '.js', '.jsx', '.css' ],
    },
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/i,
                exclude : /node_modules/,
                use : 'babel-loader',
            },
            {
                test : /\.css$/i,
                use : [ 'style-loader', 'css-loader' ],
            }
        ],
    },
};