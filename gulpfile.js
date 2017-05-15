/** iifa implementation **/
(function() {

  // use strict for strict code checking.
  'use strict';

  var gulp = require('gulp');
  var sass = require('gulp-sass');
  var sourcemaps = require('gulp-sourcemaps');
  var autoprefixer = require('gulp-autoprefixer');
  var minifyCSS = require('gulp-minify-css');
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');
  var imagemin = require('gulp-imagemin');
  var runSequence = require('run-sequence');
  // sw related confs

  var sw_precache_config = require('./docs/js/service-worker/sw.conf.js');
  var path = require('path');
  var swPrecache = require('sw-precache');

  // Bower dependencies Dependencies filesarray
  var appPath = './docs/';
  var bowerPath = 'bower_components/';
  var jsPath = 'js/assets/';
  var swPath = 'js/service-worker';
  var dependencies = [
    appPath + bowerPath + 'angular/angular.js'
  ];

  var jsFiles = [
    appPath + jsPath + 'config.js',
    appPath + jsPath + 'constants/*.js',
    appPath + jsPath + 'services/*.js',
    appPath + jsPath + 'directives/*.js',
    appPath + jsPath + 'controllers/*.js',
  ];
  // Path for all CSS files
  var cssFiles = [
    appPath + bowerPath + 'reset-css/reset.css',
    appPath + bowerPath + 'normalize-css/normalize.css',
    appPath + 'css/styles.css',
  ];

  var fontFiles = [
    appPath + 'fonts/*',
  ];
  var imgFiles = [
    appPath + 'img/*',
  ];
  // Gulp task to SASS to CSS compilation for proc env. w/o sourcemaps
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
      .pipe(gulp.dest(appPath + 'css'))
      .on('end', function() {
        gulp.run('cssUgligy');
      });
  });

  // Gulp task to minify and compile all css
  gulp.task('cssUgligy', function() {
    return gulp.src(cssFiles)
      //loading initial sourcemaps from all styles if any
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(minifyCSS())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
      .pipe(concat('all.min.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(appPath + 'dist/css'));
  });

  // Gulp task for uglification of dependencies
  gulp.task('depUgligy', function() {
    return gulp.src(dependencies)
      .pipe(concat('dependencies.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(appPath + 'dist/js'));
  });

  // Gulp task to ugligy all scripts related to the app
  gulp.task('jsUgligy', function() {
    return gulp.src(jsFiles)
      .pipe(concat('scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(appPath + 'dist/js'));
  });

  // Gulp task for moving fonts
  gulp.task('fonts', function() {
    return gulp.src(fontFiles)
      .pipe(gulp.dest(appPath + 'dist/fonts'));
  });
  // Gulp task for image minification
  gulp.task('images', function() {
    gulp.src(imgFiles)
      .pipe(imagemin())
      .pipe(gulp.dest(appPath + 'dist/img'));
  });

  //Build task for setting up dependencies and building css from sass on production.
  gulp.task('build', [], function() {
    runSequence('depUgligy', 'jsUgligy', 'sass', 'cssUgligy', 'fonts', 'images', 'generate-service-worker');
  });

  // Watch task for local development.
  gulp.task('watch:css', function() {
    gulp.watch(appPath + 'sass/**/*.scss', ['sass:dev']);
  });

  // Watch Task for JS files
  gulp.task('watch:js', function() {
    gulp.watch(appPath + 'js/**/*.js', ['jsUgligy']);
  });

  // Gulp watch main task
  gulp.task('watch', [], function() {
    runSequence('watch:css', 'watch:js');
  });

  // Gulp Task for generating service worker file.
  gulp.task('generate-service-worker', function() {
    var serviceWorkerFile = path.join('./docs', 'service-worker.js');
    return swPrecache.write(serviceWorkerFile, sw_precache_config);
  });

}());
