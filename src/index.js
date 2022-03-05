import 'dotenv/config';

import express from 'express';

import router from './routes/userRoutes';

let app = express();

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});
