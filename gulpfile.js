
// not actually sure how to push these up to the owning project yet
// putting them in because i wanted to check some stuff and couldn't because it wasn't in the repo
// but this is not where these will live in the long term

global.errorMessage = '';

var react      = require('react'),
    gulp       = require('gulp'),
    clean      = require('gulp-clean'),
    source     = require('vinyl-source-stream'),
    browserify = require('browserify'),
    react      = require('gulp-react'),
    yuidoc     = require('gulp-yuidoc'),
    path       = require('path'),
    strip_dom  = require('gulp-strip-react-dom-comment'),
    flocks     = require('flocks.js'),
    sloc       = require('gulp-sloc'),

    handleError = function(err) {
        console.log(err.toString());
        this.emit('end');
    };

gulp.task('clean', function() {
  return gulp.src(['./build','./dist'], {read: false}).pipe(clean());
});

gulp.task('build', function() {
  return browserify({
    entries:    './controls/flocks-todo.jsx',
    extensions: ['.jsx']
  })
    .transform({es6: true}, 'reactify')
    .bundle()
    .on('error', handleError)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/js'));
});
/*
gulp.task('componentize', ['clean'], function () {
  return gulp.src('./controls/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('./build/react-js'));
});

gulp.task('oldbuild', ['componentize'], function() {
  gulp.src('./build/react-js/flocks-todo.js')
    .pipe(browserify())
    .on('prebundle', function(bundle) {
      bundle.external('flocks.js');
      bundle.external('react');
    })
    .pipe(gulp.dest('./build/js'));
});
*/
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
