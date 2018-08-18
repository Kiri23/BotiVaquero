const exphbs = require("express-handlebars")
// Instantiate a DialogFlow client.
const dialogflow = require("dialogflow");

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
    languageCode: "es"
};

module.exports.detectIntent = function (id) {

}