require('dotenv').config();

const express = require('express');

const slackCtrl = require('./src/slack.js');
const drive = require('./src/drive.js');
const utils = require('./src/utils');

const app = express();

app.get('/:date?', (req, res) => {
  const dateReceived = req.params.date;

  const { dateFrom, dateTo } = utils.getFromAndToDates(dateReceived);
  let userList;
  slackCtrl.getAllUsers()
    .then((currentUserList) => {
      userList = currentUserList;
      return slackCtrl.getChannelMessages(dateFrom, dateTo);
    })
    .then((messages) => {
      const formatedMessages = slackCtrl.formatMessagesByUser(userList, messages);

      drive.addRows(formatedMessages);
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send({ message: 'Goals succesfully added' });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

const port = process.env.PORT || 5000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}!`));
