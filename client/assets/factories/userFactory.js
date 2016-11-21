console.log('Step 02: User Factory')

myApp.factory('userFactory', ['$http', function($http){
	var factory = {};

	// Send a request to the express API, return returned_data

	factory.getusers = function(callback){
		console.log('Step 05: userFactory > getusers()')
		$http.get('/users').then(function(returned_data){
			callback(returned_data.data);
		})
	};


	//The product data comes from the front end through productController
	//This function calls the '/users/create' route that posts data to the 
	// server routes, that interacts with the database to create a new entry
	factory.createuser = function(user, callback){
		console.log('Step 07: userFactory > createproducts()')
		//product is passed as the request body
		$http.post('/users/create', user).then(function(returned_data){
			callback();
		})
	};
	factory.deleteuser = function(user, callback){
		console.log('Step 08: user Factory > deleteuser()')
		console.log('userID: '+ user)
		$http.get('/users/' + user).then(function(returned_data){
			callback();
		})
	};
	return factory
}]);