import 'dotenv/config';

import express from 'express';

let app = express();

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});
