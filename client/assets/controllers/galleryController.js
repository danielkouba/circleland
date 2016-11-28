console.log('Step 03: galleryController')

myApp.controller('galleryController', function($scope, $location, $routeParams, galleryFactory){

	// Create a blank array to load drawings into.

	$scope.drawings = [];

	// Create a function that links to the factory
	// The Factory links to 



	$scope.getDrawings = function(){
		console.log($scope.userdata);
		console.log('Step 04: galleryController > getDrawings()')
		galleryFactory.getdrawings(function(data){
			$scope.drawings=data;
			console.log(data);
			$location.path('/gallery')
		})
	}	


	// Load all images in
	// getDrawings();

	function getUsersDrawings(userid){
		console.log($scope.userdata);
		console.log('galleryController: getting users drawings');
		galleryFactory.getusersdrawings(userid ,function(data){
			$scope.userdata=data;
			console.log($scope.userdata);
			// $location.path('/usergallery');
		})
	}


	if ($routeParams.userid){
		getUsersDrawings($routeParams.userid);
	} else {
		console.log('Nah')
	}
	console.log($routeParams.userid)

//Features
	// likes
	// favorite
});