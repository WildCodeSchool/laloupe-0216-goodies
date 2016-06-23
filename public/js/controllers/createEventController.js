//createEventController ======================>

function createEventController($scope, $http, eventService, $location, $rootScope, userService, userFactory, notificationService) {
  $('body').css('background-image', 'none').css('background-image', 'url("./assets/floor-1.jpg")');
  $rootScope.$on('userFactoryUpdate', function() {

    $scope.dataFriends = {};
    $scope.user = {};
    $scope.form = 1;
    $scope.creform = 1;
    $scope.required = true;
    $scope.data = {};

    $scope.user.adresse = userFactory.user.adresse;
    $scope.recettes = userFactory.user.recettes;

    function load() {
      $scope.friends = userFactory.user.friends;
    }
    load();
    // checkbox autocomplete (at home)
    $scope.adress = function() {
      if (angular.element($('#crEhomeCheckbox')).is(':checked') == true) { // lorsque la checkbox est coché
        angular.element($('#crEnumberForm')).val($scope.user.adresse.num);
        angular.element($('#crEwayForm')).val($scope.user.adresse.rue);
        angular.element($('#crEcityForm')).val($scope.user.adresse.ville);
        angular.element($('#crEpostalcodeForm')).val($scope.user.adresse.cp);
        angular.element($('#crEcountryForm')).val($scope.user.adresse.pays);
        $scope.data.crEnumberForm = $scope.user.adresse.num;
        $scope.data.crEwayForm = $scope.user.adresse.rue;
        $scope.data.crEcityForm = $scope.user.adresse.ville;
        $scope.data.crEpostalcodeForm = $scope.user.adresse.cp;
        $scope.data.crEcountryForm = $scope.user.adresse.pays;
      } else {
        angular.element($('#crEnumberForm')).val('');
        angular.element($('#crEwayForm')).val('');
        angular.element($('#crEcityForm')).val('');
        angular.element($('#crEpostalcodeForm')).val('');
        angular.element($('#crEcountryForm')).val('');
        $scope.data.crEnumberForm = '';
        $scope.data.crEwayForm = '';
        $scope.data.crEcityForm = '';
        $scope.data.crEpostalcodeForm = '';
        $scope.data.crEcountryForm = '';
      }
    };
    // =================== Ajout recettes à un évènement =============
    $scope.tabRecetteEvent = [];
    $scope.addRecette = function(idRecette, index) {
      if ($scope.tabRecetteEvent.indexOf(idRecette) == -1) {
        $scope.tabRecetteEvent.push(idRecette);
        $('#gly' + index).addClass('gly-checked');
      } else {
        $scope.tabRecetteEvent.splice($scope.tabRecetteEvent.indexOf(idRecette), 1);
        $('#gly' + index).removeClass('gly-checked');
      }
    };
    // =================== END Ajout recettes à un évènement =============
    $(function() {
      $('#search').on('keyup', function() {
        var pattern = $(this).val();
        $('.searchable-container .items').hide();
        $('.searchable-container .items').filter(function() {
          return $(this).text().match(new RegExp(pattern, 'i'));
        }).show();
      });
    });
    //================== Ajout d'events ==========

    $scope.add = function() {
      $scope.data.userId = $rootScope.userId;
      $scope.data.position = $scope.position;
      $scope.data.name = userFactory.user.name;
      $scope.data.prenom = userFactory.user.prenom;
      console.log($scope.data.prenom);
      eventService.create($scope.data).then(function(res) { // <------ create event
        userService.findOne($rootScope.userId).then(function(r) {
          userFactory.user = r.data;
        });
        $location.path('/events');
      }); // <----- End create event

    };

    // ========================= Ajout des amis dans la BD ==============
    $scope.addFriends = function() {
      $scope.dataFriends.userId = $rootScope.userId;
      userService.findMail($scope.dataFriends.email).then(function(res) {
        $scope.dataFriends.friendId = res.data._id;
        if ($rootScope.userId != $scope.dataFriends.friendId) {
          userService.createFriend($scope.dataFriends).then(function() {
            var notif = {};
            notif.userId = $scope.dataFriends.friendId;
            notif.friends = $scope.dataFriends.userId;
            notificationService.createFriends(notif).then(function() {
              userService.findOne($rootScope.userId).then(function(r) {
                userFactory.user = r.data;
                load();
              });
            });
            $scope.dataFriends = {};
          });
        }
      }, function(err) { // ============== si l'ami n'est pas dans la BDD ================
        function password() {
          var nbCaractere = 10;
          var chaine = 'azertyuiopqsdfghjklmwxcvbn123456789';
          var generatePassword = [];
          for (var i = 0; i < nbCaractere; i++) {
            generatePassword.push(chaine[Math.floor(Math.random() * (chaine.length + 1))]);
          }
          return generatePassword.join('');
        }
        $scope.dataFriends.password = password();
        console.log($scope.dataFriends.password);
        userService.create($scope.dataFriends).then(function(res) {
          $scope.dataFriends.friendId = res.data._id;
          userService.createFriend($scope.dataFriends).then(function() {
            var notif = {};
            notif.userId = $scope.dataFriends.friendId;
            notif.friends = $scope.dataFriends.userId;
            notificationService.createFriends(notif).then(function() {
              userService.findOne($rootScope.userId).then(function(r) {
                userFactory.user = r.data;
                load();
              });
            });
            $scope.dataFriends = {};
          });
        });

      });
    };
    // ===================  END Ajout des amis dans la BD =============
    // ===================  Ajout amis event =============
    $scope.data.tabFriendEvent = [];
    $scope.addFriendEvent = function(id) {

      if ($scope.data.tabFriendEvent.indexOf(id) == -1) {
        $scope.data.tabFriendEvent.push(id);
      } else {
        $scope.data.tabFriendEvent.splice($scope.data.tabFriendEvent.indexOf(id), 1);
      }
    };
    // ===================  END Ajout des amis dans la BD =============
    $scope.geoloc = function() {
      address = $scope.data.crEnumberForm + ' ' + $scope.data.crEwayForm + ' ' + $scope.data.crEpostalcodeForm + ' ' + $scope.data.crEcityForm;
      $scope.creform += 1;
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAOq8Pa8bDZCg5wbgRmcqkoP8JibZt5j1M').then(function(res) {
        $scope.position = [res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng];
      });
    };
  });
}
