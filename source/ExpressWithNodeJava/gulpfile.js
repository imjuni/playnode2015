var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass');


gulp.task('sass', function (done) {
  gulp.src('./public/css/style.scss')
    .pipe(plumber({ errorHandler: function (err) { console.log(err.message); this.emit('end'); } }))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./public/css'))
    .on('error', console.error.bind(console))
    .on('end', done)
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('develop', function () {
  livereload.listen();
  //nodemon({
  //  script: 'bin/www',
  //  ext: 'js jade coffee',
  //}).on('restart', function () {
  //  setTimeout(function () {
  //    livereload.changed(__dirname);
  //  }, 500);
  //});
});

gulp.task('default', [
  'sass',
  'develop',
  'watch'
]);
