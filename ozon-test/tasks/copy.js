var gulp = require('gulp');

gulp.task('copy', function() {
    gulp.src('src/pdf/**/**.*')
        .pipe(gulp.dest('build/pdf'))
});
