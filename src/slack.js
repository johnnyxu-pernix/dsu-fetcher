const axios = require('axios');
const moment = require('moment');

exports.getChannelMessages = getChannelMessages;
exports.getAllUsers = getAllUsers;
exports.formatMessagesByUser = formatMessagesByUser;

function getChannelMessages(fromDate, toDate) {
  return axios.get(`https://slack.com/api/channels.history?token=${process.env.SLACK_TOKEN}&channel=${process.env.CHANNEL_ID}&pretty=1&oldest=${fromDate}&latest=${toDate}`)
    .then(response => {
      return response.data.messages.map(message => {
        let date = new Date(message.ts * 1000);
        return {
          user: message.user,
          timestamp: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`,
          ts: message.ts,
          content: message.text
        }
      });
    });
}

function getAllUsers() {
  return axios.get(`https://slack.com/api/users.list?token=${process.env.SLACK_TOKEN}&channel=${process.env.CHANNEL_ID}&pretty=1`)
    .then(response => {
      return response.data.members.map(member => { return { realName: member.real_name, id: member.id, name: member.name } });
    });
}

function formatMessagesByUser(userList, messages) {
  messages = messages.sort(function (left, right) {
    return new Date(right.date) - new Date(left.date);
  });

  return messages.map(message => {
    let messageUser = message.user;
    message.user = userList.find(user => user.id === messageUser);
    return message;
  });
}

