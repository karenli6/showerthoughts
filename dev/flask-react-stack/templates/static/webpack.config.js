const path = require('path');

module.exports = {
    entry : path.resolve(__dirname, 'index.js'),
    mode : 'development',
    output : {
        path : path.resolve('../public'),
        filename : 'bundle.js',
        publicPath : path.resolve('../public')
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
    resolve : {
        extensions : [ '.js', '.jsx' ]
    }
};