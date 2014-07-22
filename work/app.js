'use strict';

/* App Module */
var tryHskControllers = angular.module('tryHskControllers', []);

var tryHsk = angular.module('tryHsk', [
  'ngRoute',
  'ngCookies',
  'tryHskControllers',
  'tryHskFilters',
  'tryHskServices'
]);