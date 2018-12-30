"use strict";

global.$ = {
  gulp: require('gulp'),
  gp: require('gulp-load-plugins')(),
  browserSync: require('browser-sync').create(),
  del: require('del'),
  fs: require('fs'),

  path: {
    tasks: require('./gulp/tasks.js'),
    jsVendor: require('./gulp/paths/js.vendor.js'),
    cssVendor: require('./gulp/paths/css.vendor.js'),
    jsApp: require('./gulp/paths/js.app.js')
  },

  config: require('./gulp/config'),

  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production'

};

$.path.tasks.forEach(function (taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'pug',
    'style',
    'js:process',
    'js:vendor',
    'css:vendor',
    'svg:sprite',
    'copy:image',
    'svg:copy',
    'copy:fonts'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));