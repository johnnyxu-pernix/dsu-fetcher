var GoogleSpreadsheet = require('google-spreadsheet');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);

exports.addRows = addRows;

const SHEET_NUMBER = 1;

function addRows(formatedMessages) {
  var creds = {
    client_email: process.env.GOOGLE_APP_MAIL,
    private_key: process.env.GOOGLE_APP_PRIVATE_KEY.replace(/\\n/g, '\n')
  };

  doc.useServiceAccountAuth(creds, async function() {
    for (let i in formatedMessages ) {
      let message = formatedMessages[i];
      await addRowsInFile(message);
    }
  });

  return true;
}

function addRowsInFile(message) {
  return new Promise((resolve, reject) => {
    doc.addRow(SHEET_NUMBER, { Date: message.timestamp, User: message.user ? message.user.realName : 'No User', Goals: message.content },
      (error, rows) => {
        if (error) {
          reject();
        } else {
          resolve();
        }
      });
    });
}
