import validateAuth from '../controller/authController.js';

import express from 'express';

import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let chatRouter = express.Router();

chatRouter.get(
    '/',
    validateAuth,
    express.static(path.join(__dirname, '/view', '/chat'))
);

export default chatRouter;
