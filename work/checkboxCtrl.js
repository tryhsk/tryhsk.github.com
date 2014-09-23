tryHskControllers.controller('checkboxCtrl', function ($scope, $rootScope, checkboxValues) {
    var flag = false;
	$rootScope.checkboxValues = checkboxValues.getCheckboxValues();
	$scope.checkboxValues = $rootScope.checkboxValues;

	$scope.$watch('checkboxValues', function () {
		checkboxValues.refreshCheckboxValues($scope.checkboxValues);
		$rootScope.checkboxValues = $scope.checkboxValues;
        if (flag) {
            try {
                $scope.$parent.refresh('меня не звали');
            } catch (e) {
            }
        }
        setTimeout(function() {flag = true}, 500)

	}, true);

	$rootScope.$watch('checkboxValues', function () {
		$scope.checkboxValues = $rootScope.checkboxValues;
	}, true);
//   3 аргумент true важен в $watch так как из за него наблюдается весь обьект целиком
});