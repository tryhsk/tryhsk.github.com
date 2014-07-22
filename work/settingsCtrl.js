tryHskControllers.controller('settingsCtrl', function ($scope, language) {
	$scope.languages = language.getLanguage();
	$scope.selections = [
		{name: 'russian',
			text: 'Русский'},
		{name: 'hanyu',
			text: '汉语'},
		{name: 'english',
			text: 'English'}
	];

	$scope.nextWord = function () {
		language.select = $scope.select;
		$scope.languages = language.getLanguage();
		$scope.select = language.select;
	}
});