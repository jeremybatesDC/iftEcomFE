var config = require('../config')
if (!config.tasks.js) return

var path = require('path')
var webpack = require('webpack')
var webpackManifest = require('./webpackManifest')

module.exports = function(env) {
	var jsSrc = path.resolve(config.root.src, config.tasks.js.src)
	var jsDest = path.resolve(config.root.dest, config.tasks.js.dest)
	var publicPath = path.join(config.tasks.js.dest, '/')
	var filenamePattern = '[name].js'
	var extensions = config.tasks.js.extensions.map(function(extension) {
		return '.' + extension
	})

	var webpackConfig = {
		context: jsSrc,
		plugins: [
			new webpack.DefinePlugin({
				'process.env' : {
					NODE_ENV: JSON.stringify(env)
				}
			})
		],
		resolve: {
			root: jsSrc,
			extensions: [''].concat(extensions)
		},
		module: {
			loaders: [{
				test: /\.js$/,
				loader: 'babel-loader?stage=1',
				exclude: /node_modules/
			}]
		}
	}

	if (env !== 'test') {
		// Karma doesn't need entry points or output settings
		webpackConfig.entry = config.tasks.js.entries

		webpackConfig.output = {
			path: path.normalize(jsDest),
			filename: filenamePattern,
			publicPath: publicPath
		}

		if (config.tasks.js.extractSharedJs) {
			// Factor out common dependencies into a shared.js
			webpackConfig.plugins.push(
				new webpack.optimize.CommonsChunkPlugin({
					name: 'shared',
					filename: filenamePattern,
				})
			)
		}
	}

	if (env === 'development') {
		webpackConfig.devtool = 'source-map'
		webpack.debug = true
	}

	if (env === 'production') {
		webpackConfig.entry = config.tasks.js.entries
		webpackConfig.output = {
			path: path.normalize(jsDest),
			filename: filenamePattern,
			publicPath: publicPath
		}

		if (config.tasks.js.extractSharedJs) {
			// Factor out common dependencies into a shared.js
			webpackConfig.plugins.push(
				new webpack.optimize.UglifyJsPlugin(),
				new webpack.optimize.CommonsChunkPlugin({
					name: 'shared',
					filename: filenamePattern,
				})
			)
		}
	}

	return webpackConfig
}
