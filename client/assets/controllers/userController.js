myApp.controller('userController', function($scope, $location, $localStorage,userFactory){

	// Create a blank array to load users into.

	$scope.users = [];
	$scope.$storage = $localStorage.$default({"user": {"name":null,"_id":null,"admin":false}});
	// Create a function that links to the factory
	// The Factory links to 

	function getUsers(){
		userFactory.getusers(function(data){
			$scope.users=data;
		})
	}	


	// Load all users in

	//getUsers();

	//Add a User
	//This takes data from the front end and passes it to the userFactory, The Factory passes it through '/users/create' route.
	//The '/users/create' passes it to the backend controller.
	//The backend Controller interacts with Mongoose and the Model to create a new entry in the Database

	$scope.adduser = function(){
		userFactory.createuser($scope.newUser, function(res){
			if(res.data.hasOwnProperty('errors')){
				$scope.regErrors = {};
				$scope.regErrors = res.data.errors;
				
			} else {
				$scope.regErrors = {};
				$scope.regMessage = {message: "Successfully Signed up. Please log in to continue"};
				$scope.newUser = {};
			}
		})
	};

	$scope.loginuser = function(){
		userFactory.loginuser($scope.user, function(res){
			if(res.data.hasOwnProperty('errors')){
				$scope.loginErrors = res.data.errors;
				$location.path('/loginreg');
			} else {
				// $localStorage.user = res.data;
				$scope.user = res.data
				$scope.$storage.user = res.data;
				$location.path('/');
			}		
		})
	}


	$scope.deleteuser = function(data){
		userFactory.deleteuser(data, function(){
			getUsers();
		})
	}
});