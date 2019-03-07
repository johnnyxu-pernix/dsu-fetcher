require('dotenv').config();

var slackCtrl = require("./src/slack.js");
var drive = require("./src/drive.js");
var utils = require("./src/utils");

const express = require('express')
const app = express()

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
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send({ message: 'Goals succesfully added' });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}!`))
