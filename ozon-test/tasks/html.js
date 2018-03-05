'use strict';

var gulp = require('gulp'),
	notify = require('gulp-notify'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

gulp.task('html', () => {
    return gulp.src('src/**/**.html')
            .pipe(gulp.dest('build'))
            .pipe(reload({stream: true}));
});