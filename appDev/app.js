'use strict';

/* App Module */
var tryHskControllers = angular.module('tryHskControllers', []);
var tryHskDirectives = angular.module('tryHskDirectives', []);
var tryHskServices = angular.module('tryHskServices', ['ngResource']);

/* underscore */
/*var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
	return window._;
});*/

var tryHsk = angular.module('tryHsk', [
	'ngRoute',
	'ngCookies',
	'templates',
	'tryHskControllers',
	'tryHskFilters',
	'tryHskDirectives',
	'tryHskServices'
]);