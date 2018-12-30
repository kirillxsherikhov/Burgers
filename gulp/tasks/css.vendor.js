"use strict";

module.exports = function () {
  $.gulp.task('css:vendor', () => {
    return $.gulp.src($.path.cssVendor)
      .pipe($.gp.concat('vendor.css'))
      .pipe($.gp.csso())
      .pipe($.gulp.dest($.config.root + '/css'))
  });
};