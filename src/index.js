import 'dotenv/config';

import express from 'express';

import { Server } from 'socket.io';

import router from './routes/userRoutes.js';

import path from 'path';

import { fileURLToPath } from 'url';

import chatRouter from './routes/chatRoutes.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let app = express();

app.use('/api', express.json(), router);

app.use('/', express.static(path.join(__dirname, '/view')));

app.use('/chat', chatRouter);

const server = app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});

const io = new Server(server);

io.on('connection', socket => {
    console.log('new connection');

    socket.emit('welcome', { msg: 'Seja bem vindo!' });

    io.emit('new connection', { msg: 'Novo usuario conectado' });
});
