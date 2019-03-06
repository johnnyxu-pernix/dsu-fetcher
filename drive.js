var GoogleSpreadsheet = require('google-spreadsheet');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);

exports.addRows = addRows;

// The sheet number starts at one
const SHEET_NUMBER = 1;

function addRows(formatedMessages) {
  let promises = [];

  var creds = {
    client_email: process.env.GOOGLE_APP_MAIL,
    private_key: process.env.GOOGLE_APP_PRIVATE_KEY.replace(/\\n/g, '\n')
  };

  const orderedMessages = formatedMessages.sort((a,b)=> a.timestamp > b.timestamp);

  doc.useServiceAccountAuth(creds, function() {
    orderedMessages.forEach(function (message) {
      doc.addRow(SHEET_NUMBER, { Date: message.timestamp, User: message.user ? message.user.realName: 'No User', Goals: message.content },
        function (error, rows) {
          promises.push(new Promise((resolve, reject) => {
            error ? reject(error) : resolve(true);
          }));
        });
    });
  });

  return Promise.all(promises);
}
