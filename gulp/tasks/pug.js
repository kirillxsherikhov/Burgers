"use strict";

module.exports = function () {
  $.gulp.task('pug', () => {
    return $.gulp.src($.config.source + '/template/pages/*.pug')
      .pipe($.gp.plumber({
        errorHandler: $.gp.notify.onError(function (err) {
          return {
            title: 'Pug',
            message: err.message
          }
        })
      }))
      .pipe($.gp.pug({
        locals: {
          content: JSON.parse($.fs.readFileSync($.config.data + '/content.json', 'utf8'))
        },
        pretty: true
      }))
      .pipe($.gulp.dest($.config.root));
  });
};