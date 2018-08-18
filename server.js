'use strict';
//Libraries
var Promise = global.Promise || require('promise');
const express = require('express')
const exphbs = require("express-handlebars")
var bodyParser = require('body-parser');
// User Files
var dialogflowConfig = require('./dialogflow')
var config = require('./config')

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

  // The text query request.
  const request = {
    session: dialogflowConfig.sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: dialogflowConfig.languageCode
      }
    }
  };

  detectIntent(request).then(answer => {
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





//detectIntent(request);

function setupDialogoFlow() {
  const languageCode = "es";


  return {
    sessionPath,
    languageCode
  };
}

// Send request and log result
async function detectIntent(request) {
  // Por si answer se queda en blanco. Que aparezca algo por lo menos en el UI y no un empty string
  var answer = "No he encontrado una respuesta aqui";
  try {
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected Intent");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    answer = result.fulfillmentText
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  } catch (error) {
    console.error(`Error - ${error}`);
  }
  return answer;
}