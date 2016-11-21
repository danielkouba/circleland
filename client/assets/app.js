var myApp = angular.module('myApp', ['ngRoute']);

console.log("Step 01: client side app.js ")

myApp.config(function ($httpProvider, $routeProvider){
	$httpProvider.interceptors.push(
	function($q, $location){
		return {
			'responseError': function(rejection){
				if (rejection.status == 401){
					$location.url('/');
				}
				return $q.reject(rejection);
			}
		};
	});

	$routeProvider
	.when('/',{
		templateUrl: 'assets/partials/products.html',
		controller: 'productController',	
		controllerAs: 'PC'
	})
	.when('/user', {
		templateUrl: 'assets/partials/users.html',
		controller: 'userController',	
		controllerAs: 'UC'
	})
	.otherwise({
		redirectTo: '/'
	})
})