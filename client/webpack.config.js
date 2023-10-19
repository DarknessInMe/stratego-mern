const { resolve } = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const config = {
	mode: isProd ? 'production' : 'development',
	entry: {
		index: './src/index.tsx',
	},
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		modules: [resolve(__dirname, './src'), 'node_modules'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack', 'url-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new Dotenv(),
	],
};

if (isProd) {
	config.optimization = {
		minimizer: [new TerserWebpackPlugin()],
	};
} else {
	config.devServer = {
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		stats: 'errors-only',
		overlay: true,
		historyApiFallback: true,
	};
}

module.exports = config;
