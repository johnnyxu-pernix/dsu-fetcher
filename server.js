require('dotenv').config();

var slackCtrl = require("./slack.js");
var drive = require("./drive.js");
var utils = require("./utils");

const express = require('express')
const app = express()
const port = 3000

app.get('/:date?', (req, res) => {
  let userList = [];
  let formatedMessages = [];
  const dateReceived = req.params.date
  let dateFrom, dateTo;
  ({ dateFrom, dateTo } = utils.getFromAndToDates(dateFrom, dateTo, dateReceived));

  slackCtrl.getAllUsers()
    .then(currentUserList => {
      userList = currentUserList;
      return slackCtrl.getChannelMessages(dateFrom, dateTo);
    })
    .then(messages => {
      formatedMessages = slackCtrl.formatMessagesByUser(userList, messages);

      drive.addRows(formatedMessages)
        .then(() => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200);
          res.send({ message: 'Goals succesfully added' });
        })
        .catch((error) => {
          res.status(500);
          res.send({ error: error });
        });
    })
});

app.listen(port, () => console.log(`Listening on port ${port}!`))
