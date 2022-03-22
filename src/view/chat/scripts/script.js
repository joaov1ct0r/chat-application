const ul = document.getElementsByTagName('ul')[0];

const submitButton = document.getElementById('submitButton');

const socket = io('http://localhost:3000');

socket.on('new connection', data => {
    handleNewConnection(data);
});

function handleNewConnection({ msg }) {
    const newMessage = `<li>Server: ${msg}</li>`;

    ul.innerHTML += newMessage;
}

socket.on('welcome', data => {
    handleOwnConnection(data);
});

function handleOwnConnection({ msg }) {
    const newMessage = `<li>Server: ${msg}</li>`;

    ul.innerHTML += newMessage;
}

submitButton.addEventListener('click', () => {
    sendNewMessage();
});

function sendNewMessage() {
    const formDiv = submitButton.parentNode;

    const message = formDiv.children[0].value;

    socket.emit('new_message', message);
}

socket.on('messages', data => {
    handleNewMessages(data);
});
