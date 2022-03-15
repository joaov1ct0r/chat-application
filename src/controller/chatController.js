import io from '../index.js';

io.on('connection', () => {
    console.log('new connection');
});
