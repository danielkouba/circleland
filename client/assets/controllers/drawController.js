myApp.controller('drawController', function($scope, $log, drawFactory){
  	console.log("Step 00: drawController")
	
	$scope.reset = function(){
		console.log("resetting drawing from drawController");
		drawFactory.reset(function(){

		})
	}


  // return drawFactory
})