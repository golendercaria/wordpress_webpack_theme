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

let port = 8083;
let domain = "https://localhost:" + port + "/";
let folder = "wp-content/themes/editions/";

let config = {
	entry: {
		app: path.resolve(__dirname) + '/js/src/app.js',
	},
	output: {
		filename: dev ? "./js/src/[name].js" : './js/build/[name].min.js',
		path: path.resolve(__dirname),
		publicPath: dev ? domain : "../../", //permet de mettre un domain sur l'ouputPath des images
		//publicPath: path.resolve(__dirname),
	},
	watch: true,
	cache: false,
	devtool: dev ? 'inline-source-map' : 'source-map',
	devServer: {
		// debug in front
		overlay: true,
		// for load ressource from other domaine -> for Wordpress domain
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		},
		port: port,
		https: true
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
					//dev ? "style-loader" : MiniCssExtractPlugin.loader,
					dev ? {
						loader: "style-loader",
						options: {
							"sourceMap": true
						}
					} : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: (loader) => [
								require('autoprefixer')({
									//grid: true,
									browsers: ['last 2 versions', 'ie > 8']
								}),
							]
						}	
					},
					'sass-loader'
				]
			},
			/*{ 
				test: /\.(png|jpg|gif|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						
						options: {
							limit: 100, //limit for convert base64
							outputPath: 'img',
							//useRelativePath: true,
							name: "[name].[ext]",
							//publicPath: dev ? "" : "../../"

			

						}
						
				t	}
				]
			}*/
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: "[name].[ext]",
							outputPath: "img",
							//publicPath: dev ? path.resolve(__dirname) : domain + folder
						},
					},
				],
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
				parallel: true,
				sourceMap: true
			}),
			// enable the css minification plugin
			new OptimizeCSSAssetsPlugin({})
		]
	},
	//if Wordpress load jQuery
	externals: {
		jquery: 'jQuery'
	}
}

if (!dev) { 
	config.plugins.push(new MiniCssExtractPlugin({
		filename: dev ? './css/build/[name].css' : './css/build/[name].min.css'
	}))
}

module.exports = config;