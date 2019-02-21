require('dotenv').config();

var slackCtrl = require("./slack.js");
var drive = require("./drive.js");

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  let userList = [];
  let formatedMessages = [];

  slackCtrl.getAllUsers()
    .then(currentUserList => {
      userList = currentUserList;
      return slackCtrl.getChannelMessages();
    })
    .then(messages => {
      formatedMessages = slackCtrl.formatMessagesByUser(userList, messages);
      try {
        if (drive.addRows(formatedMessages)) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200);
          res.send({ message: 'Goals succesfully added'});
        }
      } catch (error) {
        res.status(500);
        res.send({ error: error });
      }
    })
});

app.listen(port, () => console.log(`Listening on port ${port}!`))
