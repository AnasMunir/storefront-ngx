const path = require('path');
const webpack = require('webpack');

const APP_NAME = 'crimson';

module.exports = {
	entry: { server: `./projects/${APP_NAME}/server.ts` },
	resolve: {
		extensions: ['.js', '.ts'],
		alias: {
			'main.server': path.join(__dirname, `${APP_NAME}-server`, 'main.js')
		}
	},
	mode: 'none',
	target: 'node',
	externals: [/(node_modules|main\..*\.js)/],
	output: {
		path: path.join(__dirname, `../../dist/${APP_NAME}`),
		filename: '[name].js',
		library: 'server',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{ test: /\.ts$/, loader: 'ts-loader' },
			{
				test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
				parser: { system: true }
			}
		]
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			/(.+)?angular(\\|\/)core(.+)?/,
			path.join(__dirname, 'src'), // location of your src
			{} // a map of your routes
		),
		new webpack.ContextReplacementPlugin(
			/(.+)?express(\\|\/)(.+)?/,
			path.join(__dirname, 'src'),
			{}
		)
	]
};