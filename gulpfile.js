var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');


/* server */
gulp.task('server', function() {
    browserSync.init({
        server: {
            port : 3000,
            baseDir: "build"
        }
    });
gulp.watch('build/**/*').on('change', browserSync.reload);


});
/*Pug compile*/
gulp.task('views', function buildHTML() {
    return gulp.src('views/*.pug')
    .pipe(pug({
      // Your options in here. 
    }))
  });