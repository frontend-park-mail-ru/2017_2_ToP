const common = require('./webpack.common.js');

module.exports = {
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
    },

    watch: true,
    devtool: 'source-map'
};