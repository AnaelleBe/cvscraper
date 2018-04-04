// @see : https://github.com/jprichardson/node-google
var googleSearch = require('google')
const {google} = require('googleapis');
const customsearch = google.customsearch('v1');
var express = require('express');
var app = express();
var jade = require('jade');
var pdf = require('html-pdf');

googleSearch.resultsPerPage = 10;
googleSearch.lang = 'fr';

const CX = '004510666515970728308:pwzznbjanby';
const API_KEY = 'AIzaSyALb73cpAAiaFNkJfrCre_Jj2hvZtI1joc';

var options = {
  "base" : "http://127.0.0.1:8081/",
  "format":"A4",
  "orientation":"portrait"
};

var bdd1 = ["Cyber-résumé"];
var bdd2 = ["Basketball","Stamp Collecting, ","Travelling, ","Reading, ","Marathon running, ","Yoga, ","Chess player, ","Playing the trombone, ","Collecting rocks, ","Singing in the shower, ", "Singing in the rain, ", "Eating soup, ","Obviously NOT interaction design, ","Signing online petitions, ","Gardening, ","Hunting butterflies, ","Recaning chairs, "];
var bdd3 = ["Basketball","Stamp Collecting","Travelling","Reading","Marathon running","yoga","Chess player","Playing the trombone","Collecting rocks","Singing in the shower", "Singing in the rain", "Eating soup","Obviously NOT interaction design","Signing online petitions","gardening", "Hunting butterflies", "Recaning chairs"];
var bdd4 = ["I spent all my day with ","I was taking a bath with ","I went to Interaction 18 conference with", "I was arguing whith", "I made a great joke about"];
var bdd5 = [" and two bears came out from "," but we were angry because of "," while everyone else was talking whith", " but we fell asleep on"];
var bdd6 = ["the sea. "," four quilts.", " caterpillars.", " a tree.", " a local leader.", " a small vegetable."];

app.use(express.static('www'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  console.log('>>> New request');
  console.log(req.query);

  var fn = jade.compileFile('views/index.jade', {});

  var prenom = req.query.prenom || 'John';
  var nom = req.query.nom || 'Doe';
  var username = prenom+" "+nom;

  var texts = '';
  var imgUrl = '';

  var paragraphe3 = bdd6[Math.floor(Math.random() * bdd6.length)];
  var motAuHasard = bdd1[Math.floor(Math.random() * bdd1.length)];
  var hobbies = bdd2[Math.floor(Math.random() * bdd2.length)];
  var hobbies2 = bdd3[Math.floor(Math.random() * bdd3.length)];
  var paragraphe = bdd4[Math.floor(Math.random() * bdd4.length)];
  var paragraphe2 = bdd5[Math.floor(Math.random() * bdd5.length)];

  customsearch.cse.list({
    cx: CX,
    auth: API_KEY,
    q: username,
    searchType: 'image'
  }, (err, results) => {
    if (err) {
      console.log(err);
    }

    imgUrl = results.data.items[0].link;

    googleSearch(username, function (err, results){
      if (err) console.log(err)

      for (var i = 0; i < results.links.length; ++i) {
        texts += results.links[i].description;
      }

      var html = fn({
        titre: "Profil pic",
        message: "Hello",
        nom: username,
        mot: motAuHasard,
        hobbies: hobbies,
        hobbies2: hobbies2,
        paragraphe: paragraphe,
        paragraphe2: paragraphe2,
        paragraphe3: paragraphe3,
        url_pic: imgUrl,
        texts: texts
      });

      res.send(html);
    })
  });
});

app.use(express.static('www'));
  var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})



/*

*/
