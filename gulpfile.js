var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	minifyHTML = require('gulp-minify-html');

gulp.task('default', [
		//'compressJS'
		//,
		'compressHTML'
		//,'compressJSON'
		//,'compressCSS'
	],
	function() {
});

gulp.task('compressJS', function() {
	gulp.src([
		'appDev/vendor/js/jquery/jquery-2.1.1.min.js',
		'appDev/vendor/js/jquery/jquery.widget.min.js',
		'appDev/vendor/js/metro.min.js',
		'appDev/vendor/js/docs.js',
		'appDev/vendor/js/underscore.js',
		'appDev/vendor/angular-locale_ru-ru.js',
		'appDev/vendor/angular-route.js',
		'appDev/vendor/angular-resource.js',
		'appDev/vendor/cookies.js',
		'appDev/app.js',
		'appDev/services/*.js',
		'appDev/filters/*.js',
		'appDev/partials/*/*.js'
	])
		.pipe(uglify())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('public'))
});

gulp.task('compressCSS', function() {
	gulp.src([
		'appDev/style/tryhsk.css',
		'appDev/vendor/css/*.css'
	])
		.pipe(minifyCSS({keepBreaks:true}))
		.pipe(concat('all.css'))
		.pipe(gulp.dest('public'))
});

gulp.task('compressHTML', function() {
	var opts = {comments:true,spare:true};

	gulp.src([
		//'appDev/index.html',
		'appDev/partials/*/*.html'
	])
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('public'))

});

gulp.task('compressJSON', function() {
	gulp.src([
		'appDev/words_.json'
	])
		.pipe(function(a) {
			console.log(a);
		})
});