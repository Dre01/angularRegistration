myApp.controller('MeetingsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL){
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    
    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
           var meetingsRef = firebase.database().ref('users/' + $rootScope.currentUser.$id + '/meetings');
           var meetingsInfo = $firebaseArray(meetingsRef);
            
           $scope.meetings = meetingsInfo;
           
            meetingsInfo.$loaded().then(function(data){
                $rootScope.howManyMeetings = meetingsInfo.length;
            });//Makes sure meeting data is loaded
            
            meetingsInfo.$watch(function(data){
                $rootScope.howManyMeetings = meetingsInfo.length;
            });//Watches for changes in the array
            
            $scope.addMeeting = function(){
               meetingsInfo.$add({
                   name: $scope.meetingname,
                   date: firebase.database.ServerValue.TIMESTAMP
               }).then(function(){
                   $scope.meetingname='';
               });//Promise
           }//Add Meeting to object
          $scope.deleteMeeting = function(key){
              meetingsInfo.$remove(key);
          } //Delete Meeting
            
            
        } //User Authentication  
    }); //On Authentiation
    
}]);