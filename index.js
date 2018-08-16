'use strict';

var Promise = global.Promise || require('promise');


const express = require('express'),
  exphbs = require("express-handlebars")
const app = express()
// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
  defaultLayout: 'main',
  // Uses multiple partials dirs, templates in "shared/templates/" are shared
  // with the client-side of the app (see below).
  partialsDir: [
    'view/partials/'
  ]
});

app.use(express.static('public/'));

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
  res.render('index', {
    title: "hola"
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))



// You can find your project ID in your Dialogflow agent settings
const projectId = "botivaquero-1534364188832"; //https://dialogflow.com/docs/agents#settings
const sessionId = "quickstart-session-id2";
const query = "Que dia se paga la matricula";
const languageCode = "es";

// Instantiate a DialogFlow client.
const dialogflow = require("dialogflow");
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode
    }
  }
};

detectIntent(request);

// Send request and log result
async function detectIntent(request) {
  try {
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected Intent");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  } catch (error) {
    console.error(`Error - ${error}`);
  }
}

// sessionClient
//     .detectIntent(request)
//     .then(responses => {
//         console.log('Detected intent');
//         const result = responses[0].queryResult;
//         console.log(`  Query: ${result.queryText}`);
//         console.log(`  Response: ${result.fulfillmentText}`);
//         if (result.intent) {
//             console.log(`  Intent: ${result.intent.displayName}`);
//         } else {
//             console.log(`  No intent matched.`);
//         }
//     })
//     .catch(err => {
//         console.error('ERROR:', err);
//     });
//export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/[FILE_NAME].json"