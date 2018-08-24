const fs = require('fs');
const path = require('path');

const Message = require('./message.model');

class MessagesService {
  constructor() {
    const filePath = path.join(__dirname, 'messages.json');
    let resolvePromise;
    let rejectPromise;
    this.messagesPromise = new Promise((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        rejectPromise(err);
      } else {
        const dataArray = JSON.parse(data);
        const dataObj = dataArray.map(item => new Message(item.text, item.created));
        resolvePromise(dataObj);
      }
    });
  }

  get messages() {
    return this.messagesPromise;
  }
}

const messagesService = new MessagesService();
messagesService.messages.then((messages) => {
  for (let x = 0; x < messages.length; x++) {
    console.log(String(messages[x]));
  }
}).catch((err) => {
  console.log(err);
});
