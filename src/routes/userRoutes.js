import express from 'express';

import user from '../controller/userController.js';

let router = express.Router();

router.post('/login', user.userLogin);

router.post('/register', user.createUser);

export default router;
