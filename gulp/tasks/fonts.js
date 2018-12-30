"use strict";

module.exports = function () {
  $.gulp.task('copy:fonts', () => {
    return $.gulp.src($.config.source + '/fonts/**/*.*', {
        since: $.gulp.lastRun('copy:fonts')
      })
      .pipe($.gulp.dest($.config.root + '/fonts'));
  });
};