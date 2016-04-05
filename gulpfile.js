'use strict';

var gulp = require('gulp'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create();


//// Compile Sass
gulp.task('sass', function() {
  return gulp.src('_sass/*.style.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest('css/style.css'))
    .pipe(browserSync.stream());
	
});



////Autoprefix CSS
gulp.task('prefix', function() {
    return prefix({
      browsers: ['last 2 versions'],
      cascade: false
    });
});



// BrowserSync
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./"//,
    //index: "index.html"
  });
});



//// Watch For Changes
gulp.task('watch', function() {
  gulp.watch('_sass/_style.scss', ['sass']);
  gulp.watch("index.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['watch', 'sass', 'prefix', 'serve']);








var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');


////Sass compiling, prefixing	
gulp.task('sass', function () {
    return gulp.src('_sass/_style.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css/style.css'));
});


////BrowserSync
gulp.task('browser-sync', ['sass'], function() {
  browserSync.init({
    server: "./"//,
    //index: "index.html",
  });
});


////Watching
gulp.task('watch', function () {
    gulp.watch('_sass/*.scss', ['sass']);
    gulp.watch(['*.html']);
});


gulp.task('default', ['browser-sync', 'watch']);