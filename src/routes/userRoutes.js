import express from 'express';

import user from '../controller/userController';

let router = express.Router();

router.post('/login');

router.post('/register', user.createUser);

export default router;
