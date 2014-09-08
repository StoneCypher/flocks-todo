
// not actually sure how to push these up to the owning project yet
// putting them in because i wanted to check some stuff and couldn't because it wasn't in the repo
// but this is not where these will live in the long term

global.errorMessage = '';

var gulp       = require('gulp'),
    clean      = require('gulp-clean'),
    browserify = require('gulp-browserify'),
    react      = require('gulp-react'),
    yuidoc     = require('gulp-yuidoc'),
    path       = require('path'),
    strip_dom  = require('gulp-strip-react-dom-comment'),
    sloc       = require('gulp-sloc');

gulp.task('clean', function() {
  return gulp.src(['./build','./dist'], {read: false}).pipe(clean());
});

gulp.task('componentize', ['clean'], function () {
  return gulp.src('./controls/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('./build/react-js'));
});

gulp.task('build', ['componentize'], function() {
  gulp.src('src/js/app.js')
    .pipe(browserify({ insertGlobals : true }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('docs', ['build'], function() {
  gulp.src("./build/react-js/*.js")
    .pipe(strip_dom())
    .pipe(yuidoc())
    .pipe(gulp.dest("./doc/js"));
});

gulp.task('metrics', ['build', 'docs'], function(){
  gulp.src(['./build/react-js/*.js','./assets/js/**/*.js'])
    .pipe(sloc());
});

gulp.task('default', ['clean', 'componentize', 'build', 'docs', 'metrics']);
