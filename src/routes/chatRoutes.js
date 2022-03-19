import express from 'express';

import validateAuth from '../controller/authController';

import { fileURLToPath } from 'url';

import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let chatRoutes = express.Router();

chatRoutes.get(
    '/',
    validateAuth,
    express.static(path.join(__dirname, '/view', '/chat'))
);

export default chatRoutes;
