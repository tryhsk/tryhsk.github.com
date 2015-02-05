"use strict";

tryHskServices.factory('StateManager', ['$rootScope', function ($rootScope) {

	var stateContainer = [];

	return {
		add: function (service) {
			stateContainer.push(service);
			$rootScope.globalLoader = true;
		},

		remove: function (service) {
			stateContainer = _.without(stateContainer, service);
			if (stateContainer.length === 0) {
				$rootScope.globalLoader = false;
			}

		},

		getByName: function (service) {
			return _.include(stateContainer, service)
		},

		clear: function () {
			stateContainer.length = 0;
			return true;
		}
	}

}]);


tryHskServices.factory('SummaryStateManager', ['$rootScope', function ($rootScope) {

	var stateContainer = [];

	return {
		add: function (service) {
			stateContainer.push(service);
			$rootScope.summaryLoader = true;
		},

		remove: function (service) {
			stateContainer = _.without(stateContainer, service);

			if (stateContainer.length === 0) {
				$rootScope.summaryLoader = false;
			}

		},

		getByName: function (service) {
			return _.include(stateContainer, service)
		},

		clear: function () {
			stateContainer.length = 0;
			return true;
		}
	}

}]);