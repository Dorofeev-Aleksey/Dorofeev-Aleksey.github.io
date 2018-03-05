'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;


gulp.task('js', () => {
    gulp.src(['src/js/**/**.js', '!src/js/plugin/**.*'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js/'))
        .pipe(reload({stream: true}));
});

gulp.task('plugins', () => {
    return gulp.src('src/js/plugins/**.*')
        .pipe(concat('plugins.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'));
});