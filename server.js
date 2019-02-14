require('dotenv').config();

var slackCtrl = require("./slack.js");

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  let userList = [];
  let formatedMessages = [];

  slackCtrl.getAllUsers()
    .then(userList1 => {
      userList = userList1;
      return slackCtrl.getChannelMessages()
    })
    .then(messages => {
      formatedMessages = slackCtrl.formatMessagesByUser(userList, messages);
      res.setHeader('Content-Type', 'application/json');
      res.send(formatedMessages);
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
