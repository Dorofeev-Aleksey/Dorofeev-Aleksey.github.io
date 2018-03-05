'use strict';


const gulp = require('gulp'),
	requireDir = require('require-dir'),
	gulpSequence = require('gulp-sequence'),
	browserSync = require("browser-sync");

requireDir('./tasks');

gulp.task('build', function (callback) {
  gulpSequence(
    'clean',
    ['svgstore', 'image'],
    ['style', 'js', 'plugins'],
    'html',
    callback
  );
});

gulp.task('default', ['serve']);

// Локальный сервер, слежение
gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: './build',
    startPath: 'index.html',
    open: true,
    port: 8080,
  });

	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/style/**/**.*', ['style']);
	gulp.watch(['src/js/**/**.js', '!src/js/plugins/**.*'], ['js']);
  gulp.watch('src/js/plugins/**.js', ['plugins']);
	gulp.watch('src/img/**/**.*', ['image']);
	gulp.watch('src/sprite/svg-store/**.svg', ['svgstore']);

});
