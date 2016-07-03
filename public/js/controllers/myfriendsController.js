
function myfriendsController(userService, $scope, $rootScope, userFactory, notificationService, $location) {
    $('body').css('background-image', 'none').css('background-image', 'url("./assets/backhome.jpg")');
    $rootScope.$on('userFactoryUpdate', function() {

        function load() {
            userService.get().then(function(res) {
                $scope.users = res.data;
                $scope.friends = userFactory.user.friends;
                $scope.userId = $rootScope.userId;
            });
        }
        load();
        $scope.addNewFriend = function(userName) {
            var datas = {};
            var data = {};
            data.friends = [];
            var user = userName.split(' ');
            userService.findByNameSurname(user[1], user[0]).then(function(res) { // ===== Récupération de l'ID du Friend
                datas.friendId = res.data._id;
                datas.userId = $scope.userId;
                var tabFriends = [];
                userFactory.user.friends.forEach(function(e) {
                    tabFriends.push(e.name + ' ' + e.prenom)
                });
                if ($rootScope.userId != datas.friendId && tabFriends.indexOf(user[1] + ' ' + user[0]) == -1) {

                    // ================ ADD friends =========================
                    userService.createFriend(datas).then(function() {});

                    //================== addNotifications friends ==========
                    data.userId = datas.friendId;
                    data.friends = datas.userId;
                    var mailInvitAmi = {
                        email: res.data.email,
                        user: userFactory.user.prenom + ' ' + userFactory.user.name
                    };
                    console.log(mailInvitAmi);
                    userService.mailInvitAmi(mailInvitAmi);
                    notificationService.createFriends(data).then(function() {
                        userService.findOne($rootScope.userId).then(function(user) {
                            userFactory.user = user.data;
                            $scope.friends = userFactory.user.friends;
                        });
                    });
                }
            });
            $scope.newFriend = "";
        };
        $scope.removeFriend = function(friend) {
            userService.deleteFriend($rootScope.userId, friend._id).then(function(res) {
                userService.findOne($rootScope.userId).then(function(res) {
                    userFactory.user = res.data;
                    $scope.friends = userFactory.user.friends;
                });
            });
        };

        $scope.friendhistory = function (id){
          if ($rootScope.userId != id) {
              $location.path('/friendhistory/' + id);
          }
        }
    });
}
