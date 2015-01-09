tryHskControllers.controller('SummaryController', ['$scope', '$rootScope', 'SummaryStateManager',
	function ($scope, $rootScope, SummaryStateManager) {
		$rootScope.$watch('words', refresh, true);
		$rootScope.$watch('settings.color', refresh);

		function refresh (newValue, oldValue) {
			if(newValue === oldValue) return;
			if ($rootScope.settings.color) {
				$scope.words = $rootScope.words;
			} else {
				SummaryStateManager.add('summary');
				var words = angular.copy($rootScope.words);
				for (var i = 0; i < words.length; i++) {
					for (var j = 0; j < words[i].pinyin.length; j++) {
						words[i].pinyin[j].color = 'black';
					}
				}
				$scope.words = words;
				words = null;
				SummaryStateManager.remove('summary');
			}
		}

		$scope.predicate = 'id';
	}]);