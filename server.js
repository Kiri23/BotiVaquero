'use strict';
//Libraries
var Promise = global.Promise || require('promise');
const express = require('express')
const exphbs = require("express-handlebars")
var bodyParser = require('body-parser');
// User Files
var dialogflowConfig = require('./dialogflow')

const app = express()

app.use(express.static('public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', dialogflowConfig.hbs.engine);
app.set('view engine', 'handlebars');

// El * representa un query parameter e.g /?question="cuando es .."
app.get('/*', function (req, res) {
  var query = req.query.question;
  const request = dialogflowConfig.createRequest(query)

  dialogflowConfig.detectIntent(request).then(answer => {
    console.log("answer from route promise ", answer)
    res.render('index', {
      title: answer
    })
  })

});

app.post('/query', function (req, res) {
  var question = req.body.query;
  res.redirect(`/?question=${question}`)
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))

const request = dialogflowConfig.createRequest("cuando es la matricula")
dialogflowConfig.detectIntent(request);