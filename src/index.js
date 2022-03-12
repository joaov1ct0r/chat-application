import 'dotenv/config';

import express from 'express';

import router from './routes/userRoutes.js';

import path from 'path';

import { fileURLToPath } from 'url';

import authController from './controller/authController.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let app = express();

app.use('/api', express.json(), router);

app.use('/', express.static(path.join(__dirname, '/view')));

app.use('/chat', express.static(path.join(__dirname, '/view', '/chat')));

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});
