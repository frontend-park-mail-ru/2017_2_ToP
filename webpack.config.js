module.exports = {
	entry: {
		bundle: "./src/index.js"
	},
	
	output: {
		path: __dirname + '/src/built',
		filename: "[name].js"
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
	},

	devtool: 'source-map'
};