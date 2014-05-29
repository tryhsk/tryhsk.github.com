'use strict';

/* App Module */

var tryHsk = angular.module('tryHsk', [
  'ngRoute',
  'ngCookies',
  'tryHskControllers',
  'tryHskFilters',
  'tryHskServices'
]);


//tryHsk.config(['$routeProvider',
//  function($routeProvider) {
//    $routeProvider.
//      when('/test', {
//        templateUrl: 'partials/test.html',
//        controller: 'testCtrl'
//      }).
//      when('/summary', {
//        templateUrl: 'partials/summary.html',
//        controller: 'summaryCtrl'
//      }).
//      when('/love', {
//        templateUrl: 'partials/treeview.html',
//        controller: 'loveCtrl'
//      }).
//      when('/settings', {
//        templateUrl: 'partials/settings.html',
//        controller: 'settingsCtrl'
//      }).
//      otherwise({
//        redirectTo: '/test'
//      });
//  }]);
