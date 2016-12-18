myApp.factory('galleryFactory', ['$http', function($http){
	var factory = {};

	// Send a request to the express API, return returned_data

	factory.getdrawings = function(callback){
		$http.get('/draw').then(function(returned_data){
			callback(returned_data.data);
		})
	};
	factory.getusersdrawings = function(userid, callback){
		$http.get('/users/'+userid+'/gallery').then(function(returned_data){
			callback(returned_data.data);
		})
	}


	return factory
}]);