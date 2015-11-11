'use strict';

var gulp = require('gulp');
var serve = require('gulp-serve');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var data = require('gulp-data');

var gulpEvn = process.env.NODE_ENV || 'production';
console.log('Setting -> ', gulpEvn);

var paths = {
  jade: {
    index: {
      src: ['.//lib/jade/index.jade'],
      dst: '.'
    },
    print: {
      src: ['.//lib/jade/print.jade'],
      dst: '.'
    }
  },
  sass: {
    src: ['./lib/scss/**/*.scss'],
    dst: './components/playnode/playnode/css'
  }
};

var configuration = {
  jade: {
    pretty: true
  },
  sass: {
    errLogToConsole: true
  },
  watch: {
    interval: 300,
    debounceDelay: 1000
  }
};

function sequence () {
  var keys = Object.keys(arguments);
  var i, len, tasks = [];

  for (i = 0, len = keys.length; i < len; i++) {
    tasks.push(arguments[keys[i]]);
  }

  return function () {
    runSequence.apply(runSequence, tasks);
  };
}

gulp.task('serve', serve({ root: [ './' ], port: 7799 }));

gulp.task('jade:build:index', function (done) {
  gulp
    .src(paths.jade.index.src)
    .pipe(plumber({ errorHandler: function (err) { console.log(err.message); this.emit('end'); } }))
    .pipe(data(function () {
      return { settings: { launch: gulpEvn } };
    }))
    .pipe(jade(configuration.jade))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.jade.index.dst))
    .on('error', console.error.bind(console))
    .on('end', done);
});

gulp.task('jade:build:print', function (done) {
  gulp
    .src(paths.jade.print.src)
    .pipe(plumber({ errorHandler: function (err) { console.log(err.message); this.emit('end'); } }))
    .pipe(data(function () {
      return { settings: { launch: gulpEvn } };
    }))
    .pipe(jade(configuration.jade))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.jade.print.dst))
    .on('error', console.error.bind(console))
    .on('end', done);
});

gulp.task('css:build:sass', function (done) {
  gulp
    .src(paths.sass.src)
    .pipe(plumber({ errorHandler: function (err) { console.log(err.message); this.emit('end'); } }))
    .pipe(sass(configuration.sass))
    .pipe(gulp.dest(paths.sass.dst))
    .pipe(minifyCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.sass.dst))
    .on('error', console.error.bind(console))
    .on('end', done);
});

gulp.task('reload', function (done) {
  livereload.changed(__dirname);
  done();
});

gulp.task('watch', function () {
  livereload.listen(33729);

  gulp.watch(paths.jade.index.src, configuration.watch, sequence('jade:build:index', 'reload'));
  gulp.watch(paths.sass.src, configuration.watch, sequence('css:build:sass', 'reload'));
});

gulp.task('default', ['jade:build:index', 'jade:build:print' , 'css:build:sass', 'serve', 'watch']);