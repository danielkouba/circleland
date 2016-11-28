console.log('Step 03: userController')

myApp.controller('userController', function($scope, userFactory, $location){

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

	//Add a User
	//This takes data from the front end and passes it to the userFactory, The Factory passes it through '/users/create' route.
	//The '/users/create' passes it to the backend controller.
	//The backend Controller interacts with Mongoose and the Model to create a new entry in the Database

	$scope.adduser = function(){
		console.log('Step 06: userController > adduser()')

		userFactory.createuser($scope.newUser, function(res){
			console.log(res.data);
			if(res.data.hasOwnProperty('errors')){
				$scope.regErrors = res.data.errors;
				// $location.path('/loginreg');
			} else {

				$scope.regMessage = {message: "Successfully Signed up. Please log in to continue"};
				$scope.newUser = {};
				// $location.path('/loginreg');
			}
		})

		// userFactory.createuser($scope.newUser,function(){
		// 	console.log("Clear Form and get users")
		// 	$scope.newUser = {};
		// 	$location.path('/')
		// })
	};

	$scope.loginuser = function(){
		console.log('>> client >> assets >> controllers.js >> myApp.controller(\'LoginController\') >> $scope.loginUser');		
		userFactory.loginuser($scope.user, function(res){
			if(res.data.hasOwnProperty('errors')){
				$scope.loginErrors = res.data.errors;
				$location.path('/loginreg');
			} else {
				console.log(res.data);
				$scope.userdata = res.data;
				$location.path('/');
			}		
		})
	}

	$scope.logout = function(){
		
	}


	$scope.deleteuser = function(data){
		console.log('Step 07: userController > deleteuser()')
		userFactory.deleteuser(data, function(){
			getUsers();
		})
	}
});