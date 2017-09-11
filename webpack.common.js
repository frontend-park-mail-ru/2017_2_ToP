module.exports = {
    entry: {
        bundle: "./src/index.js"
    },

    output: {
        path: __dirname + '/src/built',
        filename: "[name].js"
    }
};