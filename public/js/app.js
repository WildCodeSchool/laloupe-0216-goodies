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
        .when('/allRecipes', {
            templateUrl: 'views/allRecipes.html',
            controller: 'allRecipesController',
            resolve: {
                userUpdate: userFactoryUpdate
            }
        })
        .when('/events', {
            templateUrl: 'views/events.html',
            controller: 'eventController',
            resolve: {
                connected: checkIsConnected,
                userUpdate: userFactoryUpdate
            }
        })
        .when('/event/:id', {
            templateUrl: 'views/eventinfo.html',
            controller: 'eventInfoController',
            resolve: {
                connected: checkIsConnected,
                userUpdate: userFactoryUpdate
            }
        })
        .when('/createEvent', {
            templateUrl: 'views/createEvent.html',
            controller: 'createEventController',
            resolve: {
                connected: checkIsConnected,
                userUpdate: userFactoryUpdate
            }
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'signupController'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'adminController',
            resolve: {
                connected: checkIsConnected,
                userUpdate: userFactoryUpdate
            }
        })
        .when('/menu', {
            templateUrl: 'views/menu.html',
            controller: 'recetteController',
            resolve: {
                connected: checkIsConnected,
                userUpdate: userFactoryUpdate
            }
        })
        .when('/createEntree', {
            templateUrl: 'views/createEntree.html',
            controller: 'recetteController',
            resolve: {
                connected: checkIsConnected,
                userUpdate: userFactoryUpdate
            }
        })
        .when('/createPlat', {
            templateUrl: 'views/createPlat.html',
            controller: 'recetteController',
            resolve: {
                connected: checkIsConnected,
                userUpdate: userFactoryUpdate
            }
        })
        .when('/createDessert', {
            templateUrl: 'views/createDessert.html',
            controller: 'recetteController',
            resolve: {
                connected: checkIsConnected,
                userUpdate: userFactoryUpdate
            }
        })
        .when('/success', {
            templateUrl: 'views/success.html',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/moncompte', {
            templateUrl: 'views/moncompte.html',
            controller: 'compteController',
            resolve: {
                connected: checkIsConnected,
                userUpdate: userFactoryUpdate
            }
        })
        .when('/friendhistory/:id', {
            templateUrl: 'views/friendhistory.html',
            controller: 'friendHistoryController',
            resolve: {
                connected: checkIsConnected,
                userUpdate: userFactoryUpdate
            }
        })
        .otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push(function($q, $location, $rootScope) {
        return {
            'request': function(config) {
                if (config.url.slice(0, 4) != 'http') {
                    config.headers = config.headers || {};
                    if (sessionStorage.getItem('token')) { // Replace with cookies
                        config.headers.authorization = sessionStorage.getItem('token');
                    }
                }
                return config;
            },
            'responseError': function(response) {
                // if (!response.config.data.prenom){
                if (response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                // }
                return $q.reject(response);
            }
        };
    });
}

function userFactoryUpdate($rootScope, userService) {
    if ($rootScope.userId) {
        userService.findOne($rootScope.userId).then(function(res) {
            userFactory.user = res.data;
            $rootScope.$emit('userFactoryUpdate')
        });
    }
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

function run($rootScope, $location, connectService, userFactory, userService) {
    if (sessionStorage.getItem('token')) { // Replace with cookies
        $rootScope.token = sessionStorage.getItem('token');
        $rootScope.userId = sessionStorage.getItem('userId');
        userService.findOne($rootScope.userId).then(function(res) {
            userFactory.user = res.data;
            console.log(userFactory.user);
            $rootScope.$emit('userFactoryUpdate');
        });
    }

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
        sessionStorage.setItem('token', ''); // Replace with cookies
        sessionStorage.setItem('userId', ''); // Replace with cookies
        $rootScope.loginMessage.title = '';
        $rootScope.loginMessage.message = '';
        $rootScope.token = '';
        $rootScope.userId = '';
        connectService.disconnect().then(function() {
            $location.url('/login');
        });
    };

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
    };
}

angular.module('app', ['ngRoute', 'flow'])
    .config(config)
    .service('eventService', eventService)
    .service('marmitonService', marmitonService)
    .service('friendService', friendService)
    .service('recetteService', recetteService)
    .service('connectService', connectService)
    .service('commentaireService', commentaireService)
    .service('notificationService', notificationService)
    .service('userService', userService)
    .factory('userFactory', userFactory)

.directive('checkPassword', checkPassword)
    .controller('connectController', connectController)
    .controller('signupController', signupController)
    .controller('eventInfoController', eventInfoController)
    .controller('allRecipesController', allRecipesController)
    .controller('mainController', mainController)
    .controller('adminController', adminController)
    .controller('friendHistoryController', friendHistoryController)
    .controller('recetteController', recetteController)
    .controller('notificationsController', notificationsController)
    .controller('eventController', eventController)
    .controller('compteController', compteController)
    .controller('createEventController', createEventController)


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

.run(run)
