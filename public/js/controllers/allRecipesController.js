// allRecipesController

function allRecipesController($scope, $rootScope, $http, recetteService, userService, commentaireService) {
    $('body').css('background-image', 'none').css('background-image', 'url("./assets/backhome.jpg")');

    $scope.moreVote = 0;
    $scope.lessVote = 0;
    $scope.seeRecipe = 1;
    $scope.newCommentaire = {};

    function load() {
        recetteService.get().then(function(res) {
            $scope.recettes = res.data;
        });
    }
    load();
    if (userFactory.user) {
        $scope.newCommentaire.userName = userFactory.user.name + ' ' + userFactory.user.prenom;
    }
    $scope.commentaires = [];

    // Bouton Ajouter à mes recettes ================================= -->
    $scope.favoris = function(recette, idFav) {
        var count = 0;
        for (var i = 0; i < userFactory.user.recettes.length; i++) {
            if (recette._id == userFactory.user.recettes[i]._id) {
                count++;
            }
        }

        if (count == 0) {
            console.log('ajout');
            recette.userId = $rootScope.userId;
            recetteService.create(recette).then(function(res) {
                userService.findOne($rootScope.userId).then(function(res) {
                    userFactory.user = res.data;
                });
            });
        }
    }

    // Scroll pour le bouton commentaire ============================== -->
    $(document).ready(function() {
        $('.js-scrollTo').on('click', function() { // Au clic sur un élément
            var page = $(this).attr('href'); // Page cible
            var speed = 750; // Durée de l'animation (en ms)
            $('html, body').animate({
                scrollTop: $(page).offset().top - 200
            }, speed); // Go
            return false;
        });
    });

    // Bouton de vote ======================= -->
    $scope.plus = function(id, vote) {
        vote += 1;
        recetteService.update(id, {
            moreVote: vote
        }).then(function() {
            $scope.clickRecipe.moreVote = vote;
        });
    }
    $scope.moins = function(id, vote) {
        vote += 1;
        recetteService.update(id, {
            lessVote: vote
        }).then(function() {
            $scope.clickRecipe.lessVote = vote;
        });
    }

    // Ajouter des commentaires =================== -->
    $scope.scrollCom = function(id) {
        $scope.newCommentaire.recetteId = id;
        $scope.Comm = 1;
    }
    $scope.addComm = function() {
        $scope.newCommentaire.userId = $rootScope.userId;
        $scope.newCommentaire.recetteId = $scope.clickRecipe._id;
        $scope.newCommentaire.date = new Date();
        commentaireService.addCommentaire($scope.newCommentaire).then(function(res) {
            $scope.newCommentaire = {};
            recetteService.findOne($scope.clickRecipe._id).then(function(res) {
                $scope.commentaires = res.data.commentaires;
            })
        });
        // $scope.commentaires.push($scope.newCommentaire)
    }

    $scope.id = function(recette) {
        $scope.clickRecipe = recette;
        $scope.commentaires = $scope.clickRecipe.commentaires;
        $scope.seeRecipe = 2;
    }

    // Ferme l'affichage de la recette et retourne aux miniatures -->
    $scope.close = function() {
        $scope.seeRecipe = 1;
    }
    $scope.updateCom = function(id, commentaire, option) {
        if (commentaire == undefined && option == undefined) {
            $scope['com' + id] = !$scope['com' + id];
        } else {
            switch (option) {
                case "valider":
                    commentaireService.updateCommentaire(commentaire._id, commentaire).then(function(res) {});
                    $scope['com' + id] = false;
                    break;
                case "annuler":
                    $scope['com' + id] = false;
                    break;
                case "supprimer":
                    commentaireService.deleteCommentaire(commentaire._id).then(function(res) {
                      recetteService.findOne($scope.clickRecipe._id).then(function(res) {
                          $scope.commentaires = res.data.commentaires;
                      })
                    });
                    $scope['com' + id] = false;
                    break;
            }
        }
    }

}
