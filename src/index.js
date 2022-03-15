import 'dotenv/config';

import express from 'express';

import socketIO from 'socket.io';

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

const io = socketIO(server);

export default io;
