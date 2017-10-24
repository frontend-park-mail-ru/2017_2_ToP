const common = require('./webpack-modules/webpack.config.com.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
    watch: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /.spec\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env'],
                    cacheDirectory: true
                }
            }
        ]
    }
});