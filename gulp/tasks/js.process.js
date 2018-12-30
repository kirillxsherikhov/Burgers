"use strict";

module.exports = function () {
  $.gulp.task('js:process', () => {
    return $.gulp.src($.path.jsApp)
      .pipe($.gp.plumber({
        errorHandler: $.gp.notify.onError(function (err) {
          return {
            title: 'JavaScript',
            message: err.message
          }
        })
      }))
      .pipe($.gp.babel())
      .pipe($.gp.if($.isDev, $.gp.sourcemaps.init()))
      .pipe($.gp.concat('common.js'))
      .pipe($.gp.if($.isDev, $.gp.sourcemaps.write()))
      .pipe($.gp.if($.isProd, $.gp.uglify()))
      .pipe($.gulp.dest($.config.root + '/js'))
      .pipe($.browserSync.stream());
  });
};