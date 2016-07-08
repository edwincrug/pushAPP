angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaPushV5,$http,$rootScope) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    var options = {
      android: {
        senderID: "67707425657",
        sound:true,
        vibrate:true
      }
    };

    $cordovaPushV5.initialize(options).then(function() {
      $cordovaPushV5.onNotification();
      $cordovaPushV5.onError();
      $cordovaPushV5.register().then(function(data) {
        console.log(data)
        var req = {
          method: 'POST',
          url: 'http://192.168.0.107:3000/api/device',
          data: {
            "title": "Device",
            "token": data
          }
        }
        $http(req).success(function(resp) {
            console.log("Push success: ", resp);
          }).error(function(error) {
            console.log("Push error: ", error);
          })
          // `data.registrationId` save it somewhere;
      })
    })

    $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
        alert(data)
    });


  });
})
