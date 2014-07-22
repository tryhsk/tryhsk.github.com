tryHskControllers.controller('checkboxCtrl', function ($scope, $rootScope, checkboxValues) {

	$rootScope.checkboxValues = checkboxValues.getCheckboxValues();
	$scope.checkboxValues = $rootScope.checkboxValues;
	$scope.$watch('checkboxValues', function () {
		checkboxValues.refreshCheckboxValues($scope.checkboxValues);
		$rootScope.checkboxValues = $scope.checkboxValues;
		try {
			$scope.$parent.refresh();
		} catch (e) {
		}
	}, true);
	$rootScope.$watch('checkboxValues', function () {
		$scope.checkboxValues = $rootScope.checkboxValues;
	}, true);
//   3 аргумент true важен в $watch так как из за него наблюдается весь обьект целиком
});