const socket = io("http://127.0.0.1:8000");

const form = document.getElementById('send-container');

const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const userList = document.querySelector('.user-names');
const audio = new Audio('css/ting.mp3');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append('You', message, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

const name = prompt("Enter Your name to join");

const append = (username, message, position) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);

    messageElement.innerHTML = `<h2 class="message-user-${position}">${username}</h2>${message}`;
    messageContainer.append(messageElement);

    if (position == 'left')
        audio.play();
    messageContainer.scrollTop = messageContainer.scrollHeight;
};

socket.emit('new-user-joined', name);

socket.on('user-joined', (name) => {
    append("", `${name} joned the chat`, 'right');
});

socket.on('receive', data => {
    append(data.name, data.message, 'left');
});

socket.on('left', name => {
    append('', `${name} left the chat`, `left`);
});