console.log('Step 03: galleryController')

myApp.controller('galleryController', function($scope, galleryFactory){

	// Create a blank array to load products into.

	$scope.products = [];

	// Create a function that links to the factory
	// The Factory links to 

	function getDrawings(){
		console.log('Step 04: galleryController > getDrawings()')
		galleryFactory.getdrawings(function(data){
			console.log(data);
			$scope.drawings=data;
		})
	}	


	// Load all images in
	getDrawings();

//Features
	// likes
	// favorite
});