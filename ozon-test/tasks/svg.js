'use strict';

var gulp = require('gulp'),
 	rename = require('gulp-rename'),
 	svgmin = require('gulp-svgmin'),
	svgstore = require('gulp-svgstore');

gulp.task('svgstore', () => {
    return gulp.src('src/sprite/svg-store/**.svg')
        .pipe(svgmin({
            plugins: [{
                removeTitle: true
            }]
        }))
        .pipe(rename({ prefix: 'icon-' }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename('svg-store.svg'))
        .pipe(gulp.dest('build/img/'));
});