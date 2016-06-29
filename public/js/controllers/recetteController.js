function recetteController($scope, recetteService, $http, $rootScope, $location, userService, marmitonService, userFactory) {

    $('body').css('background-image', 'none').css('background-image', 'url("./assets/testbg.jpg")');

    $rootScope.$on('userFactoryUpdate', function() {
        $scope.seeRecipe = 1;
        function load() {
            $scope.recettes = userFactory.user.recettes;
            console.log('2');
            console.log($scope.recettes);
        }
        load();

        $scope.showRecette = 'entree';
        $scope.closeBtnTab = [];
        $scope.userId = $rootScope.userId;
        $scope.recetteTab = [];
        $scope.data = {};
        $scope.eat = $rootScope.eat; //type: entrée, plat ou dessert

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

        /*===================  Fonction bouton Recette  ========================= */

        $scope.bouton = function(n) {
            angular.element($('#' + $scope.showRecette)).removeClass("btn-info").addClass("btn-warning");
            angular.element($('#' + n)).removeClass("btn-warning").addClass("btn-info");
            if ($scope.showRecette != n) {
                $scope.recetteTab = [];
            }
            $scope.showRecette = n;
        };
        $scope.menuShow = function(n) {
            $scope.bouton(n);
            if (n == 'entree') {
                $('body').css('background-image', 'none').css('background-image', 'url("./assets/testbg.jpg")');
            }
            if (n == 'plat') {
                $('body').css('background-image', 'none').css('background-image', 'url("./assets/pasta.jpg")');
            }
            if (n == 'dessert') {
                $('body').css('background-image', 'none').css('background-image', 'url("./assets/dessertmenu.jpg")');
            }
        };
        /*==================  Fin Fonction bouton Recette  ===================== */


        /*==================  Stockage de l'ID  ===================== */

        $scope.id = function(recette){
  				$scope.clickRecipe = recette;
  				$scope.seeRecipe=2;
  			}

        /*==================  End Stockage de l'ID  ===================== */

        $scope.close = function(){
                $scope.seeRecipe=1;
            }



        /*==================  Add first menu  ===================== */

        $scope.pushtab = function(menu) {
            $scope.recetteTab.push(menu);
            $scope.recetteAffiche = $scope.recetteTab[0];
        };

        /*==================  end Add first menu  ===================== */

        $scope.i = 0;
        $scope.y = 0;

        $scope.add = function(type) {
            var datas = {};
            datas.userId = $scope.userId;
            datas.img = $scope.imageStrings[0];
            datas.titre = $scope.titre;
            datas.description = $scope.description;
            datas.preparation = $scope.preparation;
            datas.cuisson = $scope.cuisson;
            datas.ingredient = $scope.ingredient;
            datas.recette = $scope.recette;
            datas.NbrPersonne = $scope.NbrPersonne;
            datas.difficulte = $scope.difficulte;
            datas.prix = $scope.prix;
            datas.type = type;
            datas.moreVote = 0;
            datas.lessVote = 0;
            recetteService.create(datas).then(function(res) {
                userService.findOne($rootScope.userId).then(function(res) {
                    userFactory.user = res.data;
                    $scope.recettes = userFactory.user.recettes;
                    $location.path("/success");
                });
                $scope.img = "";
                $scope.titre = "";
                $scope.description = "";
                $scope.preparation = "";
                $scope.cuisson = "";
                $scope.ingredient = "";
                $scope.recette = "";
                $scope.type = "";
                $scope.imageStrings[0] = [];
                $rootScope.eat = type;
                $scope.i++;
            });
        };

        $scope.update = function(recette) {
            recette.service.update(recette._id, recette).then(function(res) {});
        };

        $scope.delete = function(recette) {
                recette.service.delete(recette._id, recette).then(function(res) {

                });
            },

            // Redirection vers page de création
            $scope.locateEntre = function() {
                $location.path("/createEntree");
            };

        $scope.locatePlat = function() {
            $location.path("/createPlat");
        };

        $scope.locateDessert = function() {
            $location.path("/createDessert");
        };
        //  ------------   FLOW   -----------
        $scope.imageStrings = [];
        $scope.processFiles = function(files) {
            angular.forEach(files, function(flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function(event) {
                    var uri = event.target.result;
                    $scope.imageStrings[i] = uri;
                    $scope.y = 1;
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        };
        $scope.cancel = function(image) {
            image.cancel();
            $scope.y = 0;
        };

        $scope.test = function() {
            marmitonService.create($scope.data).then(function(res) {
                $scope.recetteMarmiton = res.data;
                angular.element($('#inputTitre')).val($scope.recetteMarmiton.titre);
                angular.element($('#inputCuisson')).val($scope.recetteMarmiton.cuisson);
                angular.element($('#inputPreparation')).val($scope.recetteMarmiton.preparation.replace(' ', ''));
                angular.element($('#inputIngredient')).val($scope.recetteMarmiton.ingredients.split('-').join('\r\n-'));
                angular.element($('#inputRecette')).val($scope.recetteMarmiton.recette);
                angular.element($('#inputNbrPersonne')).val($scope.recetteMarmiton.NbrPersonne.match(/[0-9]*/g)[18]);
                // var testValue = $scope.recetteMarmiton.difficulte.split('-')[1].replace(/ /g,'');
                // angular.element($('#selectDifficulte')).val($scope.recetteMarmiton.difficulte.split('-')[1].replace(/ /g,''));
                $scope.titre = $scope.recetteMarmiton.titre;
                $scope.preparation = $scope.recetteMarmiton.preparation;
                $scope.cuisson = $scope.recetteMarmiton.cuisson;
                $scope.ingredient = $scope.recetteMarmiton.ingredients.split('-').join('\r\n-');
                $scope.recette = $scope.recetteMarmiton.recette;
                $scope.NbrPersonne = $scope.recetteMarmiton.NbrPersonne.match(/[0-9]*/g)[18];
                $scope.difficulte = $scope.recetteMarmiton.difficulte.split('-')[1].replace(/ /g, '');
                $scope.prix = $scope.recetteMarmiton.prix;
                $scope.imageStrings[0] = $scope.recetteMarmiton.image;
            });
            angular.element($('#selectDifficulte')).val(2);
        };
    });

}
