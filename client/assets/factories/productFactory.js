console.log('Step 02: Product Factory')

myApp.factory('productFactory', ['$http', function($http){
	var factory = {};

	// Send a request to the express API, return returned_data

	factory.getproducts = function(callback){
		console.log('Step 05: productFactory > getproducts()')
		$http.get('/products').then(function(returned_data){
			callback(returned_data.data);
		})
	};


	//The product data comes from the front end through productController
	//This function calls the '/products/create' route that posts data to the 
	// server routes, that interacts with the database to create a new entry
	factory.createproduct = function(product, callback){
		console.log('Step 07: productFactory > createproducts()')
		//product is passed as the request body
		$http.post('/products/create', product).then(function(returned_data){
			console.log("From productFactory: "+returned_data.data)
			callback();
		})
	};

	return factory
}]);