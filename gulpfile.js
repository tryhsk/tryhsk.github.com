var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	jade = require('gulp-jade'),
	concat = require('gulp-concat'),
	minifyHTML = require('gulp-minify-html'),
	templateCache = require('gulp-angular-templatecache'),
	changed = require('gulp-changed');

gulp.task('default', [
		'compressHTML',
		'compressJS'
		//,'compressJSON'
		, 'compressCSS'
		, 'compressCSSLoader'
	],
	function () {
	});

var watcher = gulp.watch('appDev/**', ['default']);
watcher.on('change', function(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.task('compressJS', function () {
	gulp.src([
		'appDev/vendor/js/docs.js',
		'appDev/vendor/js/underscore.js',
		'appDev/internal.js',
		//'appDev/vendor/angular-locale_en-us.js',
		'appDev/vendor/angular-locale_ru-ru.js',
		'appDev/vendor/angular-route.js',
		'appDev/vendor/angular-resource.js',
		'appDev/vendor/cookies.js',
		'appDev/vendor/js/metro.js',
		'appDev/app.js',
		'public/partials/templates.js',
		'appDev/services/*.js',
		'appDev/filters/*.js',
		'appDev/partials/*/*.js'
	])
		//.pipe(changed('public/js'))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
});

gulp.task('compressJSON', function () {
	gulp.src([
		'words_.json'
	])
		.pipe(uglify())
		.pipe(gulp.dest('public'))
});

gulp.task('compressCSS', function () {
	gulp.src([
		'appDev/vendor/css/metro.css',
		'appDev/vendor/css/metro-rtl.css',
		'appDev/vendor/css/metro-icons.css',
		'appDev/vendor/css/metro-responsive.css',
		'appDev/vendor/css/metro-schemes.css',
		'appDev/style/tryhsk.css'
	])
		//.pipe(changed('public/css'))
		.pipe(minifyCSS())
		.pipe(concat('all.css'))
		.pipe(gulp.dest('public/css'))
});

gulp.task('compressCSSLoader', function () {
	gulp.src([
		'appDev/style/loader.css'
	])
		//.pipe(changed('public/css'))
		.pipe(minifyCSS({keepBreaks: true}))
		.pipe(gulp.dest('public/css'))
});

gulp.task('compressHTML', function () {
	gulp.src([
		'appDev/partials/*/*.jade'
		])
		//.pipe(changed('public/partials'))
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