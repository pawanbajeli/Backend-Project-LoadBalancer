// const express = require('express');
// const { routeRequest } = require('./router'); // Import routeRequest only
// const logger = require('./logger');

// const app = express();
// app.use(express.json());

// app.post('/route', (req, res) => {
//     const data = req.body;
//     const apiType = data.apiType || 'rest';
//     const payloadSize = Buffer.byteLength(JSON.stringify(data.payload || {}));
//     const customCriteria = data.customCriteria;

//     if (customCriteria === 'priority' || customCriteria === 'fifo') {
//         routeRequest(apiType, payloadSize, customCriteria, res);
//     } else {
//         routeRequest(apiType, payloadSize, null, res);
//     }
// });

// const server = app.listen(3000, () => {
//     console.log('Load Balancer running on port 3000');
// });

// // Call processQueues after the server has started
// server.on('listening', () => {
//     const { processQueues } = require('./router'); // Import processQueues after the server has started
//     processQueues();
// });


const express = require('express');
const { routeRequest } = require('./router'); // Import routeRequest only
const logger = require('./logger');

const app = express();
app.use(express.json());

// Handle POST requests to /route endpoint
app.post('/route', (req, res) => {
    const data = req.body;
    const apiType = data.apiType || 'rest';
    const payloadSize = Buffer.byteLength(JSON.stringify(data.payload || {}));
    const customCriteria = data.customCriteria;

    if (customCriteria === 'priority' || customCriteria === 'fifo') {
        routeRequest(apiType, payloadSize, customCriteria, res);
    } else {
        routeRequest(apiType, payloadSize, null, res);
    }
});

// Handle GET requests to /route endpoint
app.get('/route', (req, res) => {
    res.send('GET request to /route endpoint');
});

const server = app.listen(3000, () => {
    console.log('Load Balancer running on port 3000');
});

// Call processQueues after the server has started
server.on('listening', () => {
    const { processQueues } = require('./router'); // Import processQueues after the server has started
    processQueues();
});

