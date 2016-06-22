function mainController($scope, $rootScope, $http, recetteService, userFactory) {
    $('body').css('background-image', 'none').css('background-image', 'url("./assets/backhome.jpg")');
    $rootScope.$on('userFactoryUpdate', function() {

        $scope.showRecette = 'entree';

        function load() {
            recetteService.get().then(function(res) {
                $scope.recettes = res.data;
                notification(userFactory.user.notifications);
            });
        }
        load();

        $('.carousel-fade').carousel({
            interval: 3000
        });
        var front = $('.Front'),
            others = ['Left2', 'Left', 'Right', 'Right2'];
        $('.Carouseltest').on('click', '.Items', function() {
            var $this = $(this);

            $.each(others, function(i, cl) {
                if ($this.hasClass(cl)) {
                    front.removeClass('Front').addClass(cl);
                    front = $this;
                    front.addClass('Front').removeClass(cl);
                }
            });
        });
    });
}
