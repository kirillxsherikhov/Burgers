"use strict";

module.exports = function () {
  $.gulp.task('js:vendor', () => {
    return $.gulp.src($.path.jsVendor)
      .pipe($.gp.concat('vendor.min.js'))
      .pipe($.gulp.dest($.config.root + '/js'));
  });
};