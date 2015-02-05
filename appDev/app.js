'use strict';

/* App Module */
var tryHskControllers = angular.module('tryHskControllers', []),
	tryHskDirectives = angular.module('tryHskDirectives', []),
	tryHskServices = angular.module('tryHskServices', ['ngResource']),
	templates = angular.module('templates', []);

/* underscore */
/*var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
	return window._;
});*/

var tryHsk = angular.module('tryHsk', [
	'ngRoute',
	'ngCookies',
	'templates', // for gulp task
	'tryHskControllers',
	'tryHskFilters',
	'tryHskDirectives',
	'tryHskServices'
]);