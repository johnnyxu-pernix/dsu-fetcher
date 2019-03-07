const axios = require('axios');
const moment = require('moment-timezone');

function getChannelMessages(fromDate, toDate) {
  return axios.get(`https://slack.com/api/channels.history?token=${process.env.SLACK_TOKEN}&channel=${process.env.CHANNEL_ID}&pretty=1&oldest=${fromDate}&latest=${toDate}`)
    .then(response => response.data.messages.map((message) => {
      const date = new Date(message.ts * 1000);
      return {
        user: message.user,
        timestamp: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`,
        ts: message.ts,
        content: message.text,
      };
    }));
}

function getAllUsers() {
  return axios.get(`https://slack.com/api/users.list?token=${process.env.SLACK_TOKEN}&channel=${process.env.CHANNEL_ID}&pretty=1`)
    .then(response => response.data.members.map(member => (
      {
        realName: member.real_name,
        id: member.id,
        name: member.name,
      }
    )));
}

function sortMessagesByDate(messages) {
  return messages.sort((message1, message2) => {
    const message1Date = moment.unix(message1.ts).tz('America/Costa_Rica').toDate();
    const message2Date = moment.unix(message2.ts).tz('America/Costa_Rica').toDate();

    if (message1Date > message2Date) return 1;
    if (message1Date < message2Date) return -1;
    return 0;
  });
}

function formatMessagesByUser(userList, messages) {
  const sortedMessages = sortMessagesByDate(messages);

  return sortedMessages.map((message) => {
    const messageUser = message.user;
    const formatedMessage = message;
    formatedMessage.user = userList.find(user => user.id === messageUser);
    return formatedMessage;
  });
}

exports.getChannelMessages = getChannelMessages;
exports.getAllUsers = getAllUsers;
exports.formatMessagesByUser = formatMessagesByUser;
exports.sortMessagesByDate = sortMessagesByDate;
