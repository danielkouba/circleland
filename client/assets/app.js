var myApp = angular.module('myApp', ['ngRoute', 'ui.slider']);

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
    templateUrl: 'assets/partials/interactive.html',
    controller: 'drawController', 
    controllerAs: 'DC'
  })
  .when('/loginreg', {
    templateUrl: 'assets/partials/loginreg.html',
    controller: 'userController', 
    controllerAs: 'UC'
  })
	.when('/admin', {
		templateUrl: 'assets/partials/users.html',
		controller: 'userController',	
		controllerAs: 'UC'
	})
  .when('/gallery', {
    templateUrl: 'assets/partials/gallery.html',
    controller: 'galleryController', 
    controllerAs: 'GC'
  })
	.otherwise({
		redirectTo: '/'
	})
})



//This is all setting up the directive and factory for creating a P5 wrapper
myApp.directive('p5', ['p5WrapperFactory', function(p5WrapperFactory) {
  return {
    restrict: 'EA',
    scope: {
      sketch: '@'
    },
    link: function(scope, element) {
      var wrapper = p5WrapperFactory();
      
      scope.$watch('sketch', function(sketch) {
        wrapper.init(sketch, element[0]);
      });
  
      scope.$on('$destroy', function() {
        wrapper.destroy();
      });
    }
  };
}])
.factory('p5', ['$window', function($window) {
  return $window.p5;
}])
.factory('p5WrapperFactory', ['$injector', 'p5', function($injector, p5) {
  var p5Wrapper = {
    init: function(sketch, node) {
      this.destroy();
  
      if(sketch) {
        if($injector.has(sketch)) {
          sketch = $injector.get(sketch);
        }
        this.instance = new p5(sketch, node);
      }
    },
    
    destroy: function() {
      if(this.instance) {
        this.instance.remove();
        this.instance = null;
      }
    }
  };
  return function() {
    return Object.create(p5Wrapper);
  };
}]);