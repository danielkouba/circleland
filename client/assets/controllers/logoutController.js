console.log('Step 03: logoutController')

myApp.controller('logoutController', function($scope, $location, $localStorage,userFactory){

	$scope.$storage = $localStorage;

	function logoutuser(){
		userFactory.logoutuser($scope.$storage.user, function(res){
			$location.path('/loginreg')
			console.log(res)
		})
	}
	logoutuser();
	$localStorage.$reset();
	// $scope.$storage.$reset();
	console.log("We Logged out")
});