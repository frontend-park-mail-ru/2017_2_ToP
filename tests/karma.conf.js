const webpackConfig = require('../webpack.config.dev.js');

module.exports=function(config) {
    config.set({
        // конфигурация репортов о покрытии кода тестами
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
        // spec файлы, условимся называть по маске **_*.spec.js_**
        files: [
            '../node_modules/babel-polyfill/dist/polyfill.js',
            'spec/*.spec.js'
        ],
        frameworks: [ 'chai', 'jasmine' ],
        // репортеры необходимы для  наглядного отображения результатов
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
        // передаем конфигурацию webpack
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo:true
        },
        jasmineNodeOpts: {
            showColors: true,
            includeStackTrace: true,
            defaultTimeoutInterval: 144000//Increase the default jasmine time
                                           //interval.
        },
    });
};