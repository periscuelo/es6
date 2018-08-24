/**
 * Main class Message
 * @author Jose Berardo Cunha
 * @since 25/01/2017
 */
class Message {
  constructor(text = '', created = Date.now()) {
    this.text = text;
    this.created = created;
  }

  get created() {
    return this._created;
  }

  set created(created) {
    if (typeof created === 'undefined' || Number.isNaN(created)) {
      throw new Error('Invalid created');
    }
    if (Message.prototype.hasOwnProperty.call(this, '_created')) {
      throw new Error('Created already defined');
    }
    this._created = created;
  }

  toString() {
    return `Message created at: ${this.created} - Text: ${this.text}`;
  }

  static newEmptyMessage() {
    return new Message();
  }
}

/**
 * Inheritance example
 * @extends {Message}
 */
class ImageMessage extends Message {
  constructor(text = '', created = Date.now(),
    url = '', thumbnail = '') {
    super(text, created);
    this.url = url;
    this.thumbnail = thumbnail;
  }

  /**
   * Method overriden
   * @returns String
   */
  toString() {
    return `Photo${super.toString()} `
           + `- Url: ${this.url} `
           + `- Thumbnail: ${this.thumbnail}`;
  }
}

// Message instances
const emptyMessage = Message.newEmptyMessage();
const textMessage = new Message('Yesterday message', Date.now() - 86400);
const photoMessage = new ImageMessage();

// Printing objects
console.log(emptyMessage);
console.log(String(emptyMessage));
console.log(String(textMessage));
console.log(String(photoMessage));
console.log(new Date(textMessage.created).toString());

// Property shorthand
const text = 'Some text';
const created = Date.now();
const duckTypeMessage = {
  text,
  created,
};
console.log(duckTypeMessage);

//  ---- Should be true --- //
// emptyMessage is a Message
console.log(emptyMessage instanceof Message);
// textMessage is a Message
console.log(textMessage instanceof Message);
// photoMessage is a Message
console.log(photoMessage instanceof Message);
// photoMessage is an ImageMesssage
console.log(photoMessage instanceof ImageMessage);

//  ---- Should be false --- //
// textMessage is not an ImageMesssage
console.log(textMessage instanceof ImageMessage);
// duckTypeMessage is not a Message
console.log(duckTypeMessage instanceof Message);
