import 'dotenv/config';

import express from 'express';

import router from './routes/userRoutes.js';

let app = express();

app.use('/api', express.json(), router);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});
