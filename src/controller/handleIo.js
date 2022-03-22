import { Server } from 'socket.io';

export default function (server) {
    const io = new Server(server);

    let messages = [];

    io.on('connection', socket => {
        console.log('new connection');

        socket.broadcast.emit('new connection', {
            msg: 'Novo usuario conectado'
        });

        socket.emit('welcome', { msg: 'Seja bem vindo!' });

        socket.on('new_message', data => {
            messages.push(data);

            io.emit('messages', messages);
        });
    });
}
