var path = require('path');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var rootDir = 'public';

module.exports = {
	entry: './app/index.js',
	output: {
	filename: './bundle.js',
		path: path.resolve(__dirname, 'public/javascripts/')
	},
	resolve: {
		extensions: ['.js', '.marko']
	},
	module: {
        loaders: [
            {
                test: /\.marko$/,
                loader: 'marko-loader'
            },
        ]
    },
	plugins: [
	    new SWPrecacheWebpackPlugin(
			{
		        cacheId: 'hnpwa',
		        dontCacheBustUrlsMatching: /\.\w{8}\./,
		        filepath: 'public/service-worker.js',
		        minify: true,
		        navigateFallback: '/news',
	            navigateFallbackWhitelist: [/^\/news\//],
			    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}', rootDir + '/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
		        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
		        stripPrefix: 'public/',
		        dynamicUrlToDependencies: {
					'/news': [
						'views/index.marko'
					],
					'/ask': [
						'views/index.marko'
					],
					'/show': [
						'views/index.marko'
					],
					'/jobs': [
						'views/index.marko'
					],
					'/newest': [
						'views/index.marko'
					],
					'/item/:id': [
						'views/item.marko'
					] 
				}
			}
	    ),
	]
};