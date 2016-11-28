myApp.controller('drawController', function($scope, $log, $localStorage, drawFactory){
  	console.log("Step 00: drawController")
	$scope.$storage = $localStorage;

  	$scope.controls = {
                        radius: 127,
                        step: .1,
						speed: 3,
						xslide: 250,
						yslide: 250
                    };


	// $scope.reset = function(){
	// 	console.log("resetting drawing from drawController");
	// 	drawFactory.reset(function(){

	// 	})
	// }


  // return drawFactory
})