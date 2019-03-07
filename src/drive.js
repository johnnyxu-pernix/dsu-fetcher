const GoogleSpreadsheet = require('google-spreadsheet');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);

const SHEET_NUMBER = 1;

function addRowsInFile(message) {
  return new Promise((resolve, reject) => {
    doc.addRow(SHEET_NUMBER, { Date: message.timestamp, User: message.user ? message.user.realName : 'No User', Goals: message.content },
      (error) => {
        if (error) {
          reject();
        } else {
          resolve();
        }
      });
  });
}

function addRows(formatedMessages) {
  const creds = {
    client_email: process.env.GOOGLE_APP_MAIL,
    private_key: process.env.GOOGLE_APP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };

  return doc.useServiceAccountAuth(creds, async () => {
    await formatedMessages.forEach(async (message) => {
      await addRowsInFile(message);
    });
  });
}

exports.addRows = addRows;
