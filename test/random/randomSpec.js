'use strict';

describe('MainCtrl', function () {
	var scope;//we'll use this scope in our tests

	//mock Application to allow us to inject our own dependencies
	beforeEach(angular.mock.module('tryHskControllers'));
	//mock the controller for the same reason and include $rootScope and $controller
	beforeEach(angular.mock.inject(function ($rootScope, $controller) {
		//create an empty scope
		scope = $rootScope.$new();
		//declare the controller and inject our empty scope
		$controller('TestController', {$scope: scope});
	}));

	console.log(scope);
	// tests start here

});
xdescribe('myService test', function(){
	describe('when I call myService.one', function(){
		it('returns 1', function(){
			var $injector = angular.injector([ 'tryHskControllers' ]);
			console.log("lol");
			var myService = $injector.get( 'TestController' );
			console.log(myService);
			expect( myService.one ).toEqual(1);
		})
	})
});