var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = function(app) {

    app.post('/scraping', function(req, res) {
      var url = req.body.url;
    request(url, function(err, resp, body) {
      var $ = cheerio.load(body);

      var titre = $('.m_title.fn > .item > .fn');
      var titreText = titre.text();

      var preparation = $('.preptime');
      var preparationText = preparation.text();

      var cuisson = $('.cooktime');
      var cuissonText = cuisson.text();

      var ingredients = $('.m_content_recette_ingredients');
      var ingredientsText = ingredients.text();

      var recette = $('.m_content_recette_todo');
      var recetteText = recette.text();

      var NbrPersonne = $('.m_content_recette_ingredients span');
      var NbrPersonneText = NbrPersonne.text();

      var difficulte = $('.m_content_recette_breadcrumb');
      var difficulteText = difficulte.text();

      var src = $('.photo').attr("src");

      var Recette = {
        titre : titreText,
        preparation: preparationText,
        cuisson: cuissonText,
        ingredients: ingredientsText,
        recette: recetteText,
        NbrPersonne: NbrPersonneText,
        difficulte: difficulteText,
        image: src,
      };
      res.json(Recette);
    });
  });
};
