var myApp = angular.module('myApp', ['ngRoute', 'firebase'])
.constant('FIREBASE_URL', 'https://dataapp-e41c8.firebaseio.com/');

myApp.run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event, next, previous, error){
       if(error === 'AUTH_REQUIRED'){
           alert('Sorry, you must log in to access that service');
           $location.path('/login');
       } 
    });
}]);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController'
    }).
    when('/checkins/:uId/:mId', {
         templateUrl: 'views/checkins.html',
        controller: 'CheckInsController'
    }).
    when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
    }).
    when('/meetings', {
        templateUrl: 'views/meetings.html',
        controller: 'MeetingsController',
        resolve: {
            currentAuth: function(Authentication){
                return Authentication.requireAuth();
            } //current Auth
        } //Resolve
    }).
    otherwise({
        redirectTo: '/login'
    });
}]);