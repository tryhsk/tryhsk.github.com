tryHskControllers.controller('summaryCtrl', function ($scope, sortWords, SummaryStateManager) {
	$scope.refresh = function () {
		SummaryStateManager.add('summary');
		sortWords.getSortWords().then(function (words) {
			$scope.words = words;
			SummaryStateManager.remove('summary');
		});
	};
	$scope.refresh();
	$scope.predicate = 'id';
});