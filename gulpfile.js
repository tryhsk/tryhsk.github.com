var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	jade = require('gulp-jade'),
	concat = require('gulp-concat'),
	minifyHTML = require('gulp-minify-html'),
	templateCache = require('gulp-angular-templatecache');

gulp.task('default', [
		'compressHTML',
		'compressJS'
		//,'compressJSON'
		, 'compressCSS'
	],
	function () {
	});

gulp.task('compressJS', function () {
	gulp.src([
		'appDev/vendor/js/docs.js',
		'appDev/vendor/js/underscore.js',
		'appDev/vendor/angular-locale_ru-ru.js',
		'appDev/vendor/angular-route.js',
		'appDev/vendor/angular-resource.js',
		'appDev/vendor/cookies.js',
		'appDev/app.js',
		'public/partials/templates.js',
		'appDev/services/*.js',
		'appDev/filters/*.js',
		'appDev/partials/*/*.js'
	])
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
});

gulp.task('compressCSS', function () {
	gulp.src([
		'appDev/vendor/css/metro-bootstrap.css',
		'appDev/vendor/css/iconFont.css',
		'appDev/style/tryhsk.css'
	])
		//.pipe(minifyCSS({keepBreaks: true}))
		.pipe(concat('all.css'))
		.pipe(gulp.dest('public/css'))
});

gulp.task('compressHTML', function () {
	gulp.src([
		'appDev/partials/*/*.jade'
		])
		.pipe(jade())
		.pipe(minifyHTML(
			{
				spare: true
			}
		))
		.pipe(templateCache(
			{
				root: 'partials'
			}
		))
		.pipe(gulp.dest('public/partials'))
});

gulp.task('compressJSON', function () {
	gulp.src([
		'appDev/words_.json'
	])
		.pipe(function (a) {
			console.log(a);
		})
});