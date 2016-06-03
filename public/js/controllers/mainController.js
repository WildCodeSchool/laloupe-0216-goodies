function mainController($scope, $rootScope, $http,recetteService) {
	$('body').css('background-image', 'none').css('background-image','url("./assets/backhome.jpg")');
	$scope.showRecette = 'entree';

	$(function(){
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

	function load() {
		recetteService.get().then(function (res) {
			$scope.recettes = res.data;
		});
	}
	load();

	$scope.menuShow = function (n) {
		angular.element($('#'+$scope.showRecette)).removeClass( "boutonActive" );
    angular.element($('#'+n)).addClass( "boutonActive" );
    $scope.showRecette = n;
  };
}
