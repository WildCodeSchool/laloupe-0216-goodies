function compteController($scope, $rootScope, $location, eventService, friendService, userService, userFactory, notificationService) {
    $('body').css('background-image', 'none').removeProp('background-color').css('background-image', 'url("./assets/pasta.jpg")');
    $rootScope.$on('userFactoryUpdate', function() {
            $scope.load = function() {
                userService.get().then(function(res) {
                    $scope.users = res.data;
                    userService.findOne($rootScope.userId).then(function(user) {
                        userFactory.user = user.data;
                        $scope.friends = userFactory.user.friends;
                    });
                    $scope.userId = $rootScope.userId;
                });
            }
            $scope.load();
        });
        // ============================= EVENT ===================================

        $scope.nbEvents = 0; $scope.nbInvit = 0; $scope.invit = {}; $scope.dataFriends = {}; $scope.eventsInvit = []; $scope.form = 1; $scope.creform = 1; $scope.showRecette = 'entree';
        if (userFactory.user.events) {
            var events = 0;
            $scope.events = userFactory.user.events;
            for (var i = 0; i < $scope.events.length; i++) {
                var newDate = new Date();
                var date = new Date($scope.events[i].crEdateForm);
                if ($scope.events[i].userId != $rootScope.userId) {
                    $scope.nbInvit++;
                    $scope.eventsInvit.push($scope.events[i]);
                }
                if ($scope.events[i].userId == $rootScope.userId && date >= newDate) {
                    events++;
                }
            }
            $scope.nbEvents = events - $scope.nbInvit;
            $scope.events = userFactory.user.events;
        }

        $scope.required = true;

        $scope.update = function(event) {
            eventService.update(event._id, event).then(function(res) {});
        }
        $scope.delete = function(event) {
            eventService.delete(event._id).then(function(res) {});
        }

        $scope.formatDate = function(date) {
            var eventDate = new Date(date);
            var day = 0;
            var month = 0;
            if (eventDate.getDate() < 10) {
                day = '0' + eventDate.getDate();
            } else {
                day = eventDate.getDate();
            }
            if (eventDate.getMonth() + 1 < 10) {
                month = '0' + (eventDate.getMonth() + 1);
            } else {
                month = eventDate.getMonth() + 1;
            }
            return day + ' / ' + month + ' / ' + eventDate.getFullYear();
        }
        $scope.dateFilter = function(elem) {
            var newDate = new Date();
            var date = new Date(elem.crEdateForm);
            if (date <= newDate) {
                return true;
            } else {
                return false;
            }
        }
        $scope.dateFilterNext = function(elem) {
            var newDate = new Date();
            var date = new Date(elem.crEdateForm);
            if (date >= newDate) {
                return true;
            } else {
                return false;
            }
        }

        // ========================== END EVENT ==================================
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
                    userService.createFriend(datas).then(function() {
                        $scope.load()
                    });

                    //================== addNotifications friends ==========
                    data.userId = datas.friendId;
                    data.friends = datas.userId;
                    var mailInvitAmi = {
                        email: res.data.email,
                        user: userFactory.user.prenom + ' ' + userFactory.user.name
                    };
                    console.log(mailInvitAmi);
                    // userService.mailInvitAmi(mailInvitAmi);
                    notificationService.createFriends(data).then(function() {
                        userService.findOne($rootScope.userId).then(function(user) {
                            userFactory.user = user.data;
                            $scope.friends = userFactory.user.friends;
                        });
                    });
                }
            });
            $scope.userName = "";
        }; $scope.removeFriend = function(friend) {
            userService.deleteFriend($rootScope.userId, friend._id).then(function(res) {
                userService.findOne($rootScope.userId).then(function(res) {
                    userFactory.user = res.data;
                    $scope.friends = userFactory.user.friends;
                });
            });
        };

        $scope.friendhistory = function(id) {
            if ($rootScope.userId != id) {
                $location.path('/friendhistory/' + id);
            }
        }
        $rootScope.$on('userFactoryUpdate', function() {
            $scope.events = userFactory.user.events;
            $scope.user = userFactory.user;
            // ==================  Hover pencil case =============

            $(document).ready(function() {
                $('.info').hover(function() {
                    $('.fa-1').addClass('fa-12');
                }, function() {
                    $('.fa-1').removeClass('fa-12');
                });
            });

            // ================= END Hover pencil case =============

            $scope.update = function(user, element) {

                userService.update($rootScope.userId, user).then(function(res) {
                    switch (element) {
                        case 'adresse':
                            $scope.adresse = false;
                            break;
                        case 'adresseEmail':
                            $scope.adresseEmail = false;
                            break;
                        case 'adresseUserName':
                            $scope.adresseUserName = false;
                            break;
                        case 'img':
                            $scope.img = false;
                    }
                });
            }

            // ===================== FLOW IMG ======================

            $scope.imageStrings = [];
            $scope.processFiles = function(files) {
                angular.forEach(files, function(flowFile, i) {
                    var fileReader = new FileReader();
                    fileReader.onload = function(event) {
                        var uri = event.target.result;
                        $scope.imageStrings[i] = uri;
                        $scope.user.img = $scope.imageStrings[0];
                        $scope.update($scope.user, 'img');
                    };
                    fileReader.readAsDataURL(flowFile.file);
                });
            };
        });
    }
