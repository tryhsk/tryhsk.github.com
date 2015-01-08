tryHskControllers.controller('SummaryController', ['$scope', '$rootScope', 'SummaryStateManager',
	function ($scope, $rootScope, SummaryStateManager) {
		$rootScope.$watch('words', function () {
			SummaryStateManager.add('summary');
			$scope.words = $rootScope.words;
			SummaryStateManager.remove('summary');
		}, true);
		$scope.predicate = 'id';
	}]);