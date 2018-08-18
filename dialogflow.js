const exphbs = require("express-handlebars")
// Instantiate a DialogFlow client.
const dialogflow = require("dialogflow");
var config = require('./config')
const languageCode = 'es'


// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
    defaultLayout: 'main',
    // Uses multiple partials dirs, templates in "shared/templates/" are shared.
    // with the client-side of the app (see below).
    partialsDir: [
        'view/partials/'
    ]
});

const sessionClient = new dialogflow.SessionsClient();
// Define session path
const sessionPath = sessionClient.sessionPath(config.projectId, config.sessionId);

module.exports = {
    hbs: hbs,
    sessionPath: sessionPath,
    languageCode: languageCode
};

module.exports.detectIntent = async function (request) {
    var answer = "";
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
};
// Create Request with a Dynamic query
module.exports.createRequest = function (query) {
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
    return request;

}