'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const mqpacker = require('css-mqpacker');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const server = require('browser-sync');
const lost = require('lost');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('style', function() {
  return gulp.src('src/style/style.scss')
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err);
          this.emit('end');
        }
      })
    )
    .pipe(sass())
    .pipe(postcss([
      lost(),
      autoprefixer({
        browsers: ['last 4 versions']
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(csso())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('build/style/'))
    .pipe(server.stream());
});