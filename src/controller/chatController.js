import io from '../index.js';

let onConnection = socket => {
    console.log('new connection');
};

const connectionHandle = io.on('connection', onConnection);

export default connectionHandle;
