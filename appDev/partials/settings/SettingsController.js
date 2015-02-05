tryHskControllers.controller('SettingsController', ['$scope', '$rootScope', 'language','settings',
	function ($scope, $rootScope, language, settings) {


	$scope.languages = [
		'Русский',
		'汉语',
		'English'
	];
	$scope.selectLang = language.initLanguage(language);
	language.getLanguage($scope.selectLang);
	$scope.freshLanguage = function (selectLanguage) {
		language.refreshSelectlanguage(selectLanguage);
	};

	//todo убрать в инициализатор!!!
	settings.initSettings();
	$scope.$watch('settings', function () {
		settings.refreshSettings();
	}, true);
}]);