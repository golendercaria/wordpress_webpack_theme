// path for resolve
const path = require('path');
// include the js minification plugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// for clean
const CleanWebpackPlugin = require('clean-webpack-plugin');

// test is mode dev
const dev = process.env.NODE_ENV === "dev";

let domain = "http://localhost:8080/";

let config = {
	entry: {
		app: './js/src/app.js',
	},
	output: {
	filename: dev ? "./js/src/[name].js" : './js/build/[name].min.[hash].js',
		path: path.resolve(__dirname),
		publicPath : dev ? domain : "",
	},
	watch: true,
	cache: false,
	devServer: {
		// debug in front
		overlay: true,
		// for load ressource from other domaine -> for Wordpress domain
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['babel-preset-env']
					}
				}
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					dev ? "style-loader" : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: (loader) => [
								require('autoprefixer')({
									browsers: ['last 2 versions', 'ie > 8']
								})
							]
						}	
					},
					'sass-loader'
				]
			},
			{ 
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192, //limit for convert base64
							outputPath: 'img/',
							name: "[name].[ext]"
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['./js/build/*', './css/build/*']),
		require('autoprefixer')
	],
	optimization: {
		minimizer: [
			// enable the js minification plugin
			new UglifyJSPlugin({
				cache: true,
				parallel: true
			}),
			// enable the css minification plugin
			new OptimizeCSSAssetsPlugin({})
		]
	}
}

if (!dev) { 
	config.plugins.push(new MiniCssExtractPlugin({
		filename: dev ? './css/build/[name].css' : './css/build/[name].min.[hash].css'
	}))
}

module.exports = config;