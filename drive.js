var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./resources/client_secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);

exports.addRows = addRows;

// The sheet number starts at one
const SHEET_NUMBER = 1;

function addRows(formatedMessages) {
  let promises = [];

  doc.useServiceAccountAuth(creds, function() {
    formatedMessages.forEach(function (message) {
      doc.addRow(SHEET_NUMBER, { Date: message.timestamp, User: message.user.realName, Goals: message.content },
        function (error, rows) {
          promises.push(new Promise((resolve, reject) => {
            if (error) {
              reject(error);
            } else {
              resolve(true);
            }
          }));
        });
    });
  });

  return Promise.all(promises);
}
