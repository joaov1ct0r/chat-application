const ul = document.getElementsByTagName('ul')[0];

const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', () => {
    sendNewMessage();
});

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
