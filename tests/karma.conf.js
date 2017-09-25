const webpackConfig = require('../webpack.config.dev.js');

module.exports = config => {
    config.set({
        coverageReporter: {
            dir:'coverage/',
            reporters: [
                { type:'html', subdir: 'report-html' },
                { type:'lcov', subdir: 'report-lcov' }
            ],
            instrumenterOptions: {
                istanbul: { noCompact:true }
            }
        },
        files: [
            '../node_modules/babel-polyfill/dist/polyfill.js',
            'spec/*.spec.js'
        ],
        frameworks: [ 'chai', 'jasmine' ],
        reporters: ['mocha', 'coverage'],
        preprocessors: {
            'spec/*.spec.js': ['webpack', 'sourcemap']
        },
        plugins: [
            'karma-jasmine', 'karma-mocha',
            'karma-chai', 'karma-coverage',
            'karma-webpack', 'karma-phantomjs-launcher',
            'karma-mocha-reporter', 'karma-sourcemap-loader',
            'karma-chrome-launcher'
        ],
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo:true
        },
        jasmineNodeOpts: {
            showColors: true,
            includeStackTrace: true
        },
    });
};