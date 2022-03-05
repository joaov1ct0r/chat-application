import express from 'express';

import user from '../controller/userController';

let router = express.Router();

router.post('/login');

router.post('/register');

export default router;
