angular.module('starter.controllers', ['starter.services', 'ngOpenFB'])
  

 //page login
  .controller("LoginCtrl", function($scope, $state, ngFB) {

    $scope.login = function() {

       console.log("log normal");
       //Log in to your own databse
    }
    
    $scope.login_facebook = function(){
       console.log("log facebook");
       //Log in with facebook API

        ngFB.login({scope: 'email,user_posts,publish_actions'}).then(
        function (response) {

            console.log("VOICI LA REPONSE: " +response.status);

            if (response.status === 'connected') {
                console.log('Facebook login succeeded'); 


                $state.go('tab.account');
                //$scope.closeLogin();

            } else {
                alert('Facebook login failed');
            }
        });



    }

    $scope.register = function(){


       console.log("sa rentre dans register");
       $state.go('register');


    }

  })

  //page register
  .controller('RegisterCtrl', function($scope, $state) {

      $scope.data = {};

      $scope.goToLogin = function(){

          $state.go('login');
      }

      $scope.register = function(data){

          console.log("process registration");
          console.log(data);
      }

  })

  .controller('ProfileCtrl', function ($scope, ngFB) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
    function (user) {
            $scope.user = user;
    },
    function (error) {
            alert('Facebook error: ' + error.error_description);
    });
 })




  .controller('DashCtrl', function($scope) {

  })

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };

  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope,$state, ngFB) {
    $scope.settings = {
      enableFriends: true
    };

    $scope.logout = function() {
      ngFB.logout().then(
        function() {
           alert('Logout successful');
           $state.go('login');
        }, errorHandler);
      
    };
  });



