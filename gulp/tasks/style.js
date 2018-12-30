"use strict";

module.exports = function () {
  $.gulp.task('style', () => {
    return $.gulp.src([$.config.source + '/style/commons.{scss,sass}', $.config.source + '/style/media.{scss,sass}'])
      .pipe($.gp.plumber({
        errorHandler: $.gp.notify.onError(function (err) {
          return {
            title: 'Style',
            message: err.message
          }
        })
      }))
      .pipe($.gp.if($.isDev, $.gp.sourcemaps.init()))
      .pipe($.gp.sass())
      .pipe($.gp.autoprefixer({
        browsers: ['last 5 versions']
      }))
      .pipe($.gp.if($.isProd, $.gp.csso()))
      .pipe($.gp.if($.isDev, $.gp.sourcemaps.write()))
      .pipe($.gulp.dest($.config.root + '/css'))
      .pipe($.browserSync.stream())
  });
}