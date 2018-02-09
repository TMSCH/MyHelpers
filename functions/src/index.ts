process.env.DEBUG = 'actions-on-google:*';
import {DialogFlowApp} from 'actions-on-google';
import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const NAME_ACTION = 'make_name';
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';

/**
 * Returns the silly name created.
 */
function makeName(app) {
  const number = app.getArgument(NUMBER_ARGUMENT);
  const color = app.getArgument(COLOR_ARGUMENT);
  app.tell(`Alright, your silly name is ${color} ${number}! I hope you like ` +
      `it. See you next time.`);
}

export const myHelpers = functions.https.onRequest((request, response) => {
  const app = new DialogFlowApp({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  const actionMap = new Map();
  actionMap.set(NAME_ACTION, makeName);

  app.handleRequest(actionMap);
});
