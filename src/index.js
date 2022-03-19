import 'dotenv/config';

import express from 'express';

import { Server } from 'socket.io';

import router from './routes/userRoutes.js';

import path from 'path';

import handleConnection from './controller/handleConnection.js';

import chatRoutes from './routes/chatRoutes.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let app = express();

app.use('/api', express.json(), router);

app.use('/', express.static(path.join(__dirname, '/view', '/login')));

app.use(
    '/register',
    express.static(path.join(__dirname, '/view', '/registro'))
);

app.use('/chat', chatRoutes);

const server = app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});

const io = new Server(server);

io.on('connection', socket => {
    console.log('new connection');

    handleConnection(socket);
});
