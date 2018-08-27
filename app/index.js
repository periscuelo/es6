import Message from './model/message.model';

console.log('Index started');
console.dir(new Message());

/* eslint no-undef: 0 */
document.querySelector('#send').onclick = () => {
  const m = new Message(document.querySelector('#message').value);
  document.querySelector('#messages').innerHTML += `<li>${m.text} ${m.created}</li>`;
};

if (module && module.hot) {
  module.hot.accept();
}
