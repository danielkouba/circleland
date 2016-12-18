myApp.factory('userFactory', ['$http', function($http){
	var factory = {};

	// Send a request to the express API, return returned_data

	factory.getusers = function(callback){
		$http.get('/users').then(function(returned_data){
			callback(returned_data.data);
		})
	};


	//The product data comes from the front end through productController
	//This function calls the '/users/create' route that posts data to the 
	// server routes, that interacts with the database to create a new entry
	factory.createuser = function(user, callback){

		$http({
			method:"POST",
			url: "/users/create",
			data: user
		}).then(function(res){
			callback(res);
		});

	};

	factory.loginuser = function(user,callback){
		$http({
			method: "POST",
			url: "/users/login",
			data: user
		}).then(function(res){
			callback(res);
		})
	}

	factory.logoutuser = function(user,callback){
		$http({
			method: "POST",
			url: "/users/logout",
			data: user
		}).then(function(res){
			callback(res);
		})
	}

	factory.deleteuser = function(user, callback){
		$http.get('/users/' + user).then(function(returned_data){
			callback();
		})
	};
	return factory
}]);