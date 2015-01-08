tryHskControllers.controller('CheckboxController', function ($scope, $rootScope, checkboxValues) {
	$rootScope.checkboxValues = checkboxValues.getCheckboxValues();
	$rootScope.$watch('checkboxValues', function () {
		checkboxValues.refreshCheckboxValues($scope.checkboxValues);
	}, true);
});