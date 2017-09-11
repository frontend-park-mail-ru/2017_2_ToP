const common = require('./webpack-modules/webpack.common.js');
const merge = require('./src/modules/merge/merge.js');

module.exports = merge(common, {
    watch: true,
    devtool: 'source-map'
});