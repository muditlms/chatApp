(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCdOXLt1WCAgbCHMmAOpuG9ccBlHWP2ii4",
        authDomain: "mwh-firebase-test.firebaseapp.com",
        databaseURL: "https://mwh-firebase-test.firebaseio.com",
        projectId: "mwh-firebase-test",
        storageBucket: "mwh-firebase-test.appspot.com",
        messagingSenderId: "842072814945"
    };
    firebase.initializeApp(config);

    angular
        .module('app', ['firebase'])
        .factory('chatMessages', function($firebaseArray){
              var chatref = firebase.database().ref().child('chat');
              return $firebaseArray(chatref);
        })
        .controller('MyCtrl', function($firebaseArray, $firebaseObject){
            var vm = this;
            const rootRef = firebase.database().ref().child('angular');
            var ref = rootRef.child('object');
            var refUsers = rootRef.child('object').child('users');
            vm.object = $firebaseArray(ref);
            vm.users = $firebaseArray(refUsers);
            // var ref = firebase.database().ref().child('')
            console.log(vm.object)

            vm.addUser = function() {
                vm.users.$add({
                    name : vm.newuser.name,
                    age : vm.newuser.age
                }).then(function(response){
                    console.log(response);
                    vm.newuser = {}
                },
                function(){
                    alert('error')
                });
            };
        })
        .controller('ChatCtrl', function($scope, chatMessages){
            var vm = this;
            vm.user = prompt('Your name');
            // we add chatMessages array to the scope to be used in our ng-repeat
            vm.messages = chatMessages;
            console.log('vm.messages', vm.messages);
            vm.addMessage = function() {
            // calling $add on a synchronized array is like Array.push(),
            // except that it saves the changes to our database!
            vm.messages.$add({
                from: vm.user,
                content: vm.message
            });

            // reset the message input
            vm.message = "";
        };
        

        vm.messages.$loaded(function() {
            if (vm.messages.length === 0) {
                    vm.messages.$add({
                    from: "Firebase Docs",
                    content: "Hello world!"
                });
            }
          });
        })
}());