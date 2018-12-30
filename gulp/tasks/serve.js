"use strict";

module.exports = function () {
  $.gulp.task('serve', () => {
    $.browserSync.init({
      server: {
        baseDir: $.config.root
      }
    });
    $.browserSync.watch([$.config.root + '/**/*.*', '!**/*.css'], $.browserSync.reload);
  });
};