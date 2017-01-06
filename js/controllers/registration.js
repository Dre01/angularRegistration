myApp.controller('RegistrationController', ['$scope', 'Authentication', function($scope, Authentication){
    
    $scope.login = function(){
        Authentication.login($scope.user);
    }//login function
    
    $scope.logout = function(){
        Authentication.logout();
    }//Logout function
    
    $scope.register = function(){
        Authentication.register($scope.user);
    } //register function
}]); //controller