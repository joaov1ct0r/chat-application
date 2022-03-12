import authController from './controller/authController.js';

import express from 'express';

import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let router = express.Router();

export default router;
