tryHskControllers.controller('SummaryController', ['$scope', '$rootScope', 'SummaryStateManager',
	function ($scope, $rootScope, SummaryStateManager) {
		$rootScope.$watch('words', refresh, true);
		$rootScope.$watch('settings.color', refresh);

		console.log(0);
		function refresh (newValue, oldValue) {
			if (newValue === oldValue) return;
			SummaryStateManager.add('summary');
			var words = $rootScope.words;
			for (var i = 0; i < words.length; i++) {
				for (var j = 0; j < words[i].pinyin.length; j++) {
					if ($rootScope.settings.color) {
						words[i].pinyin[j].colorStyle = words[i].pinyin[j].color;
					} else {
						words[i].pinyin[j].colorStyle = 'black';
					}
				}
			}
			$scope.words = words;
			words = null;
			SummaryStateManager.remove('summary');
		}

		$scope.predicate = 'id';
	}]);