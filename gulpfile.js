var syntax = 'scss'; // Syntax: sass or scss;

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	browsersync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify"),
	rsync = require('gulp-rsync'),
	sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait'),
	px2rem = require('gulp-px-to-rem'),
	svgSprite = require("gulp-svg-sprites");



gulp.task('browser-sync', function () {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function () {
	return gulp.src('app/' + syntax + '/*.' + syntax + '')
		.pipe(wait(500))
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(sass({
			outputStyle: 'expand'
		}).on("error", notify.onError()))
		// .pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss({
			level: {
				1: {
					specialComments: 0
				}
			}
		})) // Opt., comment out when debugging
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browsersync.reload({
			stream: true
		}))
});

gulp.task('js', function () {
	return gulp.src([
			'app/js/module.js', // Always at the end
		])
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(concat('app.min.js'))
		//.pipe(uglify()) // Mifify js (opt.)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/js'))
		.pipe(browsersync.reload({
			stream: true
		}))
});

gulp.task('rsync', function () {
	return gulp.src('app/**')
		.pipe(rsync({
			root: 'app/',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
});

gulp.task('watch', ['styles', 'js', 'browser-sync'], function () {
	gulp.watch('app/' + syntax + '/**/*.' + syntax + '', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/app.min.js'], ['js']);
	gulp.watch('app/*.html', browsersync.reload)
});

gulp.task('default', ['watch']);

gulp.task('sprites', function () {
	return gulp.src('app/img/svg/*.svg')
		.pipe(svgSprite())
		.pipe(gulp.dest("app"));
});

// gulp.task('default', function(){
//     gulp.src('./app/css/main.css')
//         .pipe(px2rem({accuracy:2}))
//         .pipe(gulp.dest('./dist'));
// });