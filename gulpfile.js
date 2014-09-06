
// not actually sure how to push these up to the owning project yet
// putting them in because i wanted to check some stuff and couldn't because it wasn't in the repo
// but this is not where these will live in the long term

global.errorMessage = '';

var gulp      = require('gulp'),
    clean     = require('gulp-clean'),
    react     = require('gulp-react'),
    yuidoc    = require('gulp-yuidoc'),
    path      = require('path'),
    strip_dom = require('gulp-strip-react-dom-comment'),
    sloc      = require('gulp-sloc');

gulp.task('clean', function() {
  return gulp.src(['./build','./dist'], {read: false}).pipe(clean());
});

gulp.task('react', ['clean'], function () {
  return gulp.src('./controls/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('./build/react-js'));
});

gulp.task('yuidoc', ['react'], function() {
  gulp.src("./build/react-js/*.js")
    .pipe(strip_dom())
    .pipe(yuidoc())
    .pipe(gulp.dest("./doc/js"));
});

gulp.task('sloc', ['yuidoc'], function(){
  gulp.src(['./build/react-js/*.js','./assets/js/**/*.js'])
    .pipe(sloc());
});

gulp.task('default', ['sloc']);
