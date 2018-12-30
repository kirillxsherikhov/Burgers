"use strict";

module.exports = function () {
  $.gulp.task('copy:image', () => {
    return $.gulp.src($.config.source + '/images/**/*.{jpg,png,gif}')
      .pipe($.gp.newer($.config.root + '/images'))
      .pipe($.gulp.dest($.config.root + '/images'));
  });

  $.gulp.task('svg:copy', () => {
    return $.gulp.src($.config.source + '/images/**/*.svg')
      .pipe($.gp.newer($.config.root + '/images'))
      .pipe($.gulp.dest($.config.root + '/images'))
  });
};