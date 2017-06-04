var gulp = require('gulp');

gulp.task('build-sw', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'public';

  swPrecache.write(`${rootDir}/service-worker.js`, {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}', rootDir + '/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    stripPrefix: rootDir,
    dynamicUrlToDependencies: {
    	'/news/:page?': [
    		'views/index.marko'
    	],
      '/ask/:page?': [
        'views/index.marko'
      ],
      '/show/:page?': [
        'views/index.marko'
      ],
      '/jobs/:page?': [
        'views/index.marko'
      ],
      '/newest/:page?': [
        'views/index.marko'
      ],
      '/item/:id': [
        'views/item.marko'
      ] 
    }
  }, callback);
});