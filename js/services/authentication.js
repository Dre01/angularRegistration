myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL', function($rootScope, $firebaseAuth, $firebaseObject, $location, FIREBASE_URL){
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    
    auth.$onAuthStateChanged(function(authUser){
       if(authUser){
           var userRef = firebase.database().ref('users/' + authUser.uid);
           var userObj = $firebaseObject(userRef);
           $rootScope.currentUser = userObj;
       } else{
           $rootScope.currentUser = '';
       }
    });
    
    
    var myObject = {
        login: function(user){
           auth.$signInWithEmailAndPassword(user.email, user.password)
           .then(function(regUser){
               $location.path('/meetings')
           }).catch(function(error){
               $rootScope.message = error.message;
           });
        },
        
        logout: function(){
            return auth.$signOut();
        }, //Logout User
        
        requireAuth: function(){
            return auth.$requireSignIn();  
        }, //require Authentication
        
        register: function(user){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(function(regUser){
                
                var regRef = firebase.database().ref('users')
                .child(regUser.uid).set({
                    regUser: regUser.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }); //User Information
                
                myObject.login(user);
            })
            .catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/weak-password'){
                    alert ("Password is too weak");
                }
                else{
                    alert(errorMessage);
                }
                console.log(error);
            });
        } //Create/Register a User
    };
    return myObject;
}]); //Firebase Authentication Factory