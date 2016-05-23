function config($routeProvider, $httpProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'mainController',
        })
        .when('/login', {
            templateUrl: 'views/connect.html',
            controller: 'connectController'
        })
        .when('/events', {
            templateUrl: 'views/events.html',
            controller: 'eventController'
        })
        .when('/createEvent', {
            templateUrl: 'views/createEvent.html',
            controller: 'eventController'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'signupController'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'adminController',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/dessert', {
          templateUrl: 'views/dessert.html',
          controller: 'recetteController',
        })
        .when('/plat', {
          templateUrl: 'views/plat.html',
          controller: 'recetteController',
        })
        .when('/entree', {
          templateUrl: 'views/entree.html',
          controller: 'recetteController',
        })
        .when('/menu', {
          templateUrl: 'views/menu.html',
          controller: 'recetteController',
        })
        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .otherwise({
            redirectTo: '/'
        });

  $httpProvider.interceptors.push(function($q, $location, $rootScope) {
    return {
      'request': function(config) {
        config.headers = config.headers || {};
        if ($rootScope.token) {
          config.headers.authorization = $rootScope.token;
        }
        return config;
      },
      'responseError': function(response) {
        if (response.status === 401 || response.status === 403) {
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  });
}

function checkIsConnected($q, $http, $rootScope, $location) {
  var deferred = $q.defer();

  $http.get('/api/loggedin').success(function() {
    // Authenticated
    deferred.resolve();
  }).error(function() {
    // Not Authenticated
    deferred.reject();
    $location.url('/login');
  });

  return deferred.promise;
};


function run($rootScope, $location, connectService) {
  $rootScope.loginMessage = {};
  $rootScope.loginMessage.title = '';
  $rootScope.loginMessage.message = '';

  // Watch path
  var path = function() {
    return $location.path();
  };
  $rootScope.$watch(path, function(newVal, oldVal) {
    $rootScope.activetab = newVal;
  });

  // Logout
  $rootScope.logout = function() {
    $rootScope.token = null;
    $rootScope.loginMessage.title = '';
    $rootScope.loginMessage.message = '';
    connectService.disconnect().then(function() {
      $location.url('/login');
    })
  }

}

function checkPassword() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.checkPassword;
      elem.add(firstPassword).on('keyup', function() {
        scope.$apply(function() {
          var v = elem.val() === $(firstPassword).val();
          ctrl.$setValidity('passwordMatch', v);
        });
      });
    }
  }
}

angular.module('app', ['ngRoute','flow'])
  .config(config)
  .directive('checkPassword', checkPassword)
  .controller('connectController', connectController)
  .controller('signupController', signupController)
  .controller('mainController', mainController)
  .controller('adminController', adminController)
  .controller('recetteController', recetteController)
  .controller('eventController', eventController)
  .service('eventService', eventService)
  .service('friendService', friendService)
  .service('recetteService', recetteService)
  .service('connectService', connectService)
  .service('userService', userService)
  /*.factory('', )*/
  .config(['flowFactoryProvider', function(flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: '/upload',
      permanentErrors: [404, 500, 501]
    };
    // You can also set default events:
    flowFactoryProvider.on('catchAll', function(event) {
      console.log('catchAll', arguments);
    });
    // Can be used with different implementations of Flow.js
    // flowFactoryProvider.factory = fustyFlowFactory;
  }])
.run(run);
