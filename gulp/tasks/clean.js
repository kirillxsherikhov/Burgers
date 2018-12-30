"use strict";

module.exports = function () {
  $.gulp.task('clean', () => {
    return $.del($.config.root);
  });
};