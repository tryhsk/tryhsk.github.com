tryHskControllers.controller('ratingCtrl', function ($scope, $http) {
	setInterval(function() {
		$http.get('/users').success(function(data) {
			VK.api("users.get", {user_ids: data, fields: "photo_medium"}, function (data) {
				$scope.users = data;
			});
		});
	},3000);
});