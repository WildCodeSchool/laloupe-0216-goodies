function marmitonService($http) {
  return {
    create: function(data) {
      return $http.post('/scraping', data);
    },
    get: function(Recette){
      return $http.get(Recette);
    }
  };
}
