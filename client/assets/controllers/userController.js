console.log('Step 03: userController')

myApp.controller('userController', function($scope, userFactory){

	// Create a blank array to load users into.

	$scope.users = [];

	// Create a function that links to the factory
	// The Factory links to 

	function getUsers(){
		console.log('Step 04: userController > getUsers()')
		userFactory.getusers(function(data){
			$scope.users=data;
		})
	}	


	// Load all products in

	getUsers();

	//Add a product
	//This takes data from the front end and passes it to the Product Factory, The Factory passes it through '/products/create' route.
	//The '/products/create' passes it to the backend controller.
	//The backend Controller interacts with Mongoose and the Model to create a new entry in the Database

	$scope.adduser = function(){
		console.log('Step 06: userController > adduser()')
		userFactory.createuser($scope.newUser,function(){
			console.log("Clear Form and get products")
			$scope.newUser = {};
			//This is how we update info without reloading
			getUsers();
		})
	};
	$scope.deleteuser = function(data){
		console.log('Step 07: userController > deleteuser()')
		userFactory.deleteuser(data, function(){
			getUsers();
		})
	}
});