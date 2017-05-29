import webpack from 'webpack'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'

const PRODUCTION = process.env.NODE_ENV === 'production'
const DEFINE_PRODUCTION = new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' }})
const EXTRACT_CSS = new ExtractTextPlugin({ filename: 'css/[name].[hash].css' })
const UGLIFY = new UglifyJSPlugin({ output: { comments: false }})
const VENDOR = new webpack.optimize.CommonsChunkPlugin({
	name: 'vendor',
	minChunks: module => module.context && module.context.indexOf('node_modules') !== -1 && module.request.indexOf('css') === -1
})
const MANIFEST = new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' })
const STATS_ANALYZER = new BundleAnalyzerPlugin({ generateStatsFile: true })
const HTML = new HtmlWebpackPlugin({
  title: '',
  template: __dirname + '/src/pug/index.pug',
  filename: __dirname + '/public/index.html',
  minify: {
  	removeScriptTypeAttributes: true,
  	removeEmptyElements: false
  },
  xhtml: true
})
const SERVICE_WORKER = new SWPrecacheWebpackPlugin({
	cacheId: 'hf',
	filename: 'hf-sw.js',
	maximumFileSizeToCacheInBytes: 4194304,
	minify: true,
	staticFileGlobs: [
		'public/css/**.css',
		'public/js/**.js',
		'public/favicon.ico',
		'public/manifest.json',
	],
	stripPrefix: 'public/'
})

const CONFIG = {
	entry: {
		app: __dirname + '/src/js/app.js',
	},
	output: {
		path: __dirname + '/public',
		filename: `js/[name].[hash].js`,
		chunkFilename: `js/[name].[hash].js`
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.vue$/,
			use: 'vue-loader'
		}, {
			test: /\.pug$/,
			use: 'pug-loader'
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'images/[name].[ext]?[hash]'
				}
			}]
		}, {
			test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]'
				}
			}]
		}]
	},
	plugins: [
		VENDOR,
		MANIFEST,
		HTML
	],
	resolve: {
		extensions: [ '.js', '.vue', '.scss', '.json' ],
		modules: [ 'node_modules', __dirname + '/src/' ]
	},
	devServer: {
		port: 8088,
		historyApiFallback: true
	}
}

if (PRODUCTION) {
	CONFIG.output.publicPath = '/'
	CONFIG.module.rules = (CONFIG.module.rules || []).concat([
		{
			test: /\.scss$/,
			use: EXTRACT_CSS.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							discardComments: {
								removeAll: true
							},
							colormin: true
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			})
		}
	])
	CONFIG.plugins = (CONFIG.plugins || []).concat([
		DEFINE_PRODUCTION,
		EXTRACT_CSS,
		UGLIFY,
		STATS_ANALYZER,
		SERVICE_WORKER,
	])
}
else {
	CONFIG.output.publicPath = '/'
	CONFIG.devtool = '#cheap-module-eval-source-map'
	CONFIG.module.rules = (CONFIG.module.rules || []).concat([
		{
			test: /\.scss$/,
			use: [
				'style-loader?sourceMap',
				'css-loader?sourceMap',
				'postcss-loader?sourceMap',
				'sass-loader?sourceMap'
			]
		}
	])
}

export default CONFIG
