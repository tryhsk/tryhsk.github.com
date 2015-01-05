tryHskControllers.controller('checkboxCtrl', function ($scope, $rootScope, checkboxValues) {

	//TODO хрень какая то
	$rootScope.checkboxValues = checkboxValues.getCheckboxValues();
	$scope.checkboxValues = $rootScope.checkboxValues;
	$scope.count = 0;
	$scope.$watch('checkboxValues', function () {
		checkboxValues.refreshCheckboxValues($scope.checkboxValues);
		$rootScope.checkboxValues = $scope.checkboxValues;
		try {
			// init
			if ($scope.count > 1) $scope.$parent.refresh();
			$scope.count = ++$scope.count;
		} catch (e) {
		}
	}, true);
	$rootScope.$watch('checkboxValues', function () {
		$scope.checkboxValues = $rootScope.checkboxValues;
	}, true);
// 3 аргумент true важен в $watch так как из за него наблюдается весь обьект целиком
});