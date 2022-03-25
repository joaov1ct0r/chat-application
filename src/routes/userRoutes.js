import express from 'express';

import { userLogin, createUser } from '../controller/userController.js';

let router = express.Router();

router.post('/login', userLogin);

router.post('/register', createUser);

export default router;
