myApp.controller('logoutController', function($scope, $location, $localStorage,userFactory){

	$scope.$storage = $localStorage;

	function logoutuser(){
		userFactory.logoutuser($scope.$storage.user, function(res){
			$location.path('/loginreg')
		})
	}
	logoutuser();
	$localStorage.$reset();
	// $scope.$storage.$reset();
});