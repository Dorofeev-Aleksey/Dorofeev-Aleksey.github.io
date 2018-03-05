'use strict';

var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

gulp.task('image', () => {
    gulp.src('src/img/**/**.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('build/img/'))
        .pipe(reload({stream: true}));
});