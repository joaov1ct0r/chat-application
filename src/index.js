import 'dotenv/config';

import express from 'express';

import cookieParser from 'cookie-parser';

import router from './routes/userRoutes.js';

import handleConnection from './controller/handleConnection.js';

import authController from './controller/authController.js';

import path from 'path';

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

app.use(
    '/chat',
    cookieParser(),
    authController,
    express.static(path.join(__dirname, '/view', '/chat'))
);

const server = app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});
