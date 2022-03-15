import authController from '../controller/authController.js';

import chatController from '../controller/chatController.js';

import express from 'express';

import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let chatRouter = express.Router();

chatRouter.get(
    '/',
    authController,
    express.static(path.join(__dirname, '/view', '/chat'))
);

export default chatRouter;
