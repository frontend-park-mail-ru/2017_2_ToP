const path = require('path');

module.exports = {
    entry: {
        bundle: "./src/index.js"
    },

    output: {
        filename: "[name].js",
        path: path.join(__dirname, '..', 'src/built')
    },

    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.xml/,
                loader: 'tp-fest-loader'
            }
        ]
    }
};