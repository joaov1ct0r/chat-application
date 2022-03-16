const socket = io('http://localhost:3000');

socket.on('new connection', data => {
    console.log(data.msg);
});
