let messages = [];

function handleConnection(socket) {
    socket.broadcast.emit('new connection', { msg: 'Novo usuario conectado' });

    socket.emit('welcome', { msg: 'Seja bem vindo!' });

    socket.on('new_message', data => {
        messages.push(data);
    });
}

export default handleConnection;
