console.log('Step 03: productController')

myApp.controller('productController', function($scope, productFactory){

	// Create a blank array to load products into.

	$scope.products = [];

	// Create a function that links to the factory
	// The Factory links to 

	function getProducts(){
		console.log('Step 04: productController > getProducts()')
		productFactory.getproducts(function(data){
			$scope.products=data;
		})
	}	


	// Load all products in

	getProducts();

	//Add a product
	//This takes data from the front end and passes it to the Product Factory, The Factory passes it through '/products/create' route.
	//The '/products/create' passes it to the backend controller.
	//The backend Controller interacts with Mongoose and the Model to create a new entry in the Database

	$scope.addproduct = function(){
		console.log('Step 06: productController > getProducts()')
		productFactory.createproduct($scope.newProduct,function(data){
			console.log("Clear Form and get products")
			$scope.newProduct = {};
			//This is how we update info without reloading
			getProducts();
		})
	};
});