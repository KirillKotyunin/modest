'use strict';

var gulp = require('gulp'),
	pug  = require('gulp-pug'),
	sass = require('gulp-sass'),	
	csso = require('gulp-csso'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('pug', function() {
	return gulp.src('src/pug/pages/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.on('error', notify.onError({
        title: "Pug Error",
        message: "<%= error.message %>",
        sound: "Blow"
    }))
		.pipe(gulp.dest('dist'))
		.on('end',browserSync.reload);
});

gulp.task('sass', function() {
	return gulp.src('src/static/sass/main.sass')
		.pipe(sourcemaps.init())
		.pipe(
      sass()
      .on('error', notify.onError({
          title: "Sass Error",
          message: "<%= error.message %>",
          sound: "Blow"
      }))
  	)
		.pipe(autoprefixer({
            browsers: ['last 10 versions']
        }))
        .on("error", notify.onError({
	        title: "Style"
	    }))
		.pipe(csso())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('scripts:lib', function() {
	return gulp.src(['node_modules/jquery/dist/jquery.min.js',
		'node_modules/slick-carousel/slick/slick.min.js'])
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('scripts', function() {
	return gulp.src('src/static/js/main.js')
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('watch', function(){
	gulp.watch('src/pug/**/*.pug', gulp.series('pug'))﻿;
	gulp.watch('src/static/**/*.sass', gulp.series('sass'))﻿;
	gulp.watch('src/static/js/main.js', gulp.series('scripts'))﻿;
});

gulp.task('default',gulp.series(
	gulp.parallel('pug', 'sass', 'scripts:lib', 'scripts'),
	gulp.parallel('watch', 'browser-sync')
));