import Message from './model/message.model';
import template from './messages.html';
import './styles/modules/MessageBox.scss';
import './styles/modules/MessagesArea.scss';
import logo from './images/especializa_logo.jpg';

console.log('Index started');
console.dir(new Message());

/* eslint no-undef: 0 */
document.querySelector('#send').onclick = () => {
  const m = new Message(document.querySelector('#message').value);
  document.querySelector('#messages').innerHTML += template(m);
};

document.querySelector('#logo').src = logo;

if (module && module.hot) {
  module.hot.accept();
}
