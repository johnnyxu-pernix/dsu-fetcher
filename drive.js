var GoogleSpreadsheet = require('google-spreadsheet');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);

exports.addRows = addRows;

function addRows(formatedMessages) {
  let promises = [];
  var creds = require('./resources/client_secret.json');

  doc.useServiceAccountAuth(creds, function() {
    formatedMessages.forEach(function (message, index) {
      doc.addRow(1, { Date: message.timestamp, User: message.user.realName, Goals: message.content },
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
