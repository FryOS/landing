var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var rimraf = require('rimraf');
var rename = require('gulp-rename');


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
gulp.task('templates', function buildHTML() {
    return gulp.src('source/template/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'))
  });

/* css styles*/
gulp.task('sass', function () {
    return gulp.src('source/styles/main.scss')
      .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('build/css'));

  });   


  /*Sprite */
  gulp.task('sprite', function (cb) {
    var spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: 'sprite.scss',
    }));
    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
});

/*delete*/
gulp.task('clean', function del(cb){
    return rimraf('build', cb);
});
/*copyImages*/
gulp.task('copyImages', function(){
    return gulp.src('./source/images/**/*.*').pipe(
        gulp.dest('build/images'));
});
/*copyFonts*/
gulp.task('copyFonts', function(){
    return gulp.src('./source/fonts/**/*.*').pipe(
        gulp.dest('build/fonts'));
});
/*copy*/
gulp.task('copy', gulp.parallel('copyFonts', 'copyImages'));


/*Watchers*/
gulp.task('watch', function(){
    gulp.watch ('source/template/**/*.pug', gulp.series('templates'));
    gulp.watch ('source/styles/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('clean', 
    gulp.parallel('templates', 'sass', 'sprite', 'copy'),
    gulp.parallel('watch','server')

));