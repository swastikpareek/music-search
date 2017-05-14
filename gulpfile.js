/** iifa implementation **/
(function() {

  // use strict for strict code checking.
  'use strict';

  var gulp = require('gulp');
  var sass = require('gulp-sass');
  var sourcemaps = require('gulp-sourcemaps');
  var autoprefixer = require('gulp-autoprefixer');
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');
  var runSequence = require('run-sequence');

  // Bower dependencies Dependencies filesarray
  var appPath = './docs/';
  var bowerPath = 'bower_components/';
  var dependencies = [
    appPath + bowerPath + 'angular/angular.js'
  ];

  // Gulp task to SASS to CSS compilation for proc env.
  gulp.task('sass', function() {
    gulp.src(appPath + 'sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 version']
      }))
      .pipe(gulp.dest(appPath + 'css'));
  });

  // Gulp task to SASS to CSS compilation for dev env.
  gulp.task('sass:dev', function() {
    gulp.src(appPath + 'sass/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 version']
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(appPath + 'css'));
  });

  // Gulp task for uglification of dependencies
  gulp.task('js', function() {
    return gulp.src(dependencies)
      .pipe(concat('dependencies.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(appPath + 'js'));
  });

  //Build task for setting up dependencies and building css from sass on production.
  gulp.task('build', [], function() {
    runSequence('js', 'sass');
  });

  // Watch task for local development.
  gulp.task('watch', function() {
    gulp.watch(appPath + 'sass/**/*.scss', ['sass:dev']);
  });

}());
