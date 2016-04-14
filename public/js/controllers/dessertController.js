function dessertController($scope, dessertService) {


  // ADD PROFILE
  $scope.add = function() {
    var datas = {};
    datas.img = $scope.imageStrings[0];
    dessertService.create(datas).then(function(res) {
      load();
    });
  };
  //  ------------   FLOW   -----------
  $scope.imageStrings = [];
  $scope.processFiles = function(files) {
    angular.forEach(files, function(flowFile, i) {
      var fileReader = new FileReader();
      fileReader.onload = function(event) {
        var uri = event.target.result;
        $scope.imageStrings[i] = uri;
      };
      fileReader.readAsDataURL(flowFile.file);
    });
  };
}
