const chai = require('chai');
const slack = require('../src/slack');

chai.should();

describe('Slack handler', () => {
  describe('date sort list', () => {
    it('should sort messages by date', (done) => {
      const messages = [
        {
          ts: '1551922254.098900',
          stringDate: 'Wednesday, March 6, 2019 7:30:54.098 PM GMT-06:00'
        },
        {
          ts: '1551876087.068100',
          stringDate: 'Wednesday, March 6, 2019 6:41:27.068 AM GMT-06:00'
        },
        {
          ts: '1551935395.918',
          stringDate: 'Wednesday, March 6, 2019 11:09:55.918 PM GMT-06:00'
        },
      ];

      const sortedMessages = slack.sortMessagesByDate(messages);

      sortedMessages[0].stringDate.should.be.equal('Wednesday, March 6, 2019 6:41:27.068 AM GMT-06:00');
      sortedMessages[1].stringDate.should.be.equal('Wednesday, March 6, 2019 7:30:54.098 PM GMT-06:00');
      sortedMessages[2].stringDate.should.be.equal('Wednesday, March 6, 2019 11:09:55.918 PM GMT-06:00');

      done();
    });

    it('should format the messages', (done) => {
      const messages = [
        {
          user: 'UG6GHG5PA',
          timestamp: '3/6/2019 - 5:34:12 PM',
          ts: '1551915252.007000',
          content: '2nd',
          // Wednesday, March 6, 2019 5:34:12.007 PM GMT-06:00
        },
        {
          user: 'UG6GHG5PA',
          timestamp: '3/6/2019 - 11:10:27 PM',
          ts: '1551935395.918',
          content: '4th',
          // Wednesday, March 6, 2019 11:09:55.918 PM GMT-06:00
        },
        {
          ts: '1551922254.098900',
          user: 'UG6GHG5PA',
          content: '3rd',
          // Wednesday, March 6, 2019 7:30:54.098 PM GMT-06:00
        },
        {
          ts: '1551876087.068100',
          user: 'UG6GHG5PA',
          content: '1st',
          // Wednesday, March 6, 2019 6:41:27.068 AM GMT-06:00
        },
      ];

      const userList = [
        { realName: 'Slackbot', id: 'USLACKBOT', name: 'slackbot' },
        { realName: 'Johnny Xu', id: 'UG6GGSEKA', name: 'jxu' },
        { realName: 'Blaken', id: 'UG6GHG5PA', name: 'dugarte' }
      ];
      const formatedMessages = slack.formatMessagesByUser(userList, messages);
      formatedMessages.should.be.a('array').with.lengthOf(4);
      formatedMessages[0].should.be.a('object');
      formatedMessages[0].user.id.should.equal('UG6GHG5PA');
      formatedMessages[0].content.should.equal('1st');
      formatedMessages[1].content.should.equal('2nd');
      formatedMessages[2].content.should.equal('3rd');
      formatedMessages[3].content.should.equal('4th');

      done();
    });
  });
});
