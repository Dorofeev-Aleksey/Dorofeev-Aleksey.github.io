'use strict';

var gulp = require('gulp'),
 	del = require('del');


gulp.task('clean', () => {
    return del('build');
});