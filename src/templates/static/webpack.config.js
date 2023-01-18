const path = require('path');

module.exports = {
    entry : path.resolve(__dirname, 'index.jsx'),
    mode : 'development',
    output : {
        path : path.resolve('../public'),
        filename : 'bundle.js',
        publicPath : path.resolve('../public'),
        clean : true,
    },
    resolve : {
        extensions : [ '.js', '.jsx' ],
    },
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
};