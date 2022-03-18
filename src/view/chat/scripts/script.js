const ul = document.getElementsByTagName('ul')[0];

const socket = io('http://localhost:3000');

socket.on('new connection', data => {
    handleNewConnection(data);
});

function handleNewConnection({ msg }) {
    const newMessage = `<li>${msg}</li>`;

    ul.innerHTML += newMessage;
}
