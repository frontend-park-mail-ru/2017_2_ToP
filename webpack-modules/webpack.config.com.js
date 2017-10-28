const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '[name].css'
});

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            './src/static/css/main.scss',
            './src/index.js'
        ],
        halloween: './src/static/css/themes/halloween.scss',
    },

    output: {
        filename: '[name].js',
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
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.xml/,
                loader: 'tp-fest-loader'
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                    // use style-loader in development
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpg|gid|svg)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        extractSass
    ]
};