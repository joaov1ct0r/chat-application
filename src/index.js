import 'dotenv/config';

import express from 'express';

import router from './routes/userRoutes.js';

import path from 'path';

import { fileURLToPath } from 'url';

let app = express();

app.use('/api', express.json(), router);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});
