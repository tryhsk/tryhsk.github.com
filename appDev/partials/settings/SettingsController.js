tryHskControllers.controller('SettingsController', ['$scope', '$rootScope', 'language','settings',
	function ($scope, $rootScope, language, settings) {


	// TODO bad solve  use $rootScope
		//need only for init
	$scope.selectLang = $rootScope.content.code;
	$scope.freshLanguage = function (selectLanguage) {
		language.refreshSelectlanguage(selectLanguage);
	};

	//todo убрать в инициализатор!!!
	settings.initSettings();
	$scope.$watch('settings', function () {
		settings.refreshSettings();
	}, true);
}]);