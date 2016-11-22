myApp.controller('drawController', function($scope, $log, drawFactory){
  	console.log("Step 00: drawController")
	

  	$scope.controls = {
                        radius: 127,
                        step: .1,
						speed: 3
                    };





	$scope.reset = function(){
		console.log("resetting drawing from drawController");
		drawFactory.reset(function(){

		})
	}


  // return drawFactory
})