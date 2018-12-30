"use strict";

module.exports = function () {
  $.gulp.task('svg:copy', () => {
    return $.gulp.src([$.config.source + '/images/sprite/*.svg', $.config.source + '/images/svg/*.svg'])
      .pipe($.gp.newer($.config.root + '/images'))
      .pipe($.gp.cheerio({
        run: function ($) {
          $(['fill']).removeAttr('fill');
          $(['stroke']).removeAttr('stroke');
          $(['style']).removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        }
      }))
      .pipe($.gp.replace('&gt;', '>'))
      .pipe($.gulp.dest($.config.root + '/images/icon/'))
  });
};