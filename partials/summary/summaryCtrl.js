tryHskControllers.controller('summaryCtrl', ['$scope', '$rootScope', 'sortWords', 'SummaryStateManager',
	function ($scope, $rootScope, sortWords, SummaryStateManager) {
	$scope.refresh = function () {
		SummaryStateManager.add('summary');
		sortWords.getSortWords().then(function (words) {
			$scope.words = words;
			SummaryStateManager.remove('summary');
		});
	};
	$scope.refresh(); // init
	$scope.predicate = 'id';
}]);