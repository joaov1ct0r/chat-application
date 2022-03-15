import io from '../index.js';

let chat = {
    connection: io.on('connection', () => {
        console.log('new connection');
    })
};

export default chat;
