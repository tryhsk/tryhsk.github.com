tryHskControllers.controller('summaryCtrl', function ($scope, $rootScope, sortWords, SummaryStateManager) {
	$scope.refresh = function () {
		SummaryStateManager.add('summary');
		sortWords.getSortWords().then(function (words) {
			var length = words.length;
			for (var i = 0; i < length; i++) {
			}
			$scope.words = words;
			SummaryStateManager.remove('summary');
		});
	};

	$scope.refresh();
	$scope.predicate = 'id';
});