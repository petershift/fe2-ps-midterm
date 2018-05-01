const path = require('path');

module.exports = {
	devtool: 'source-map',
	mode: 'development',
	entry: './src/myapp.js',
	output: {
		path: path.resolve(__dirname, './public/js/'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env']
				}
			}
		]
	}
};
