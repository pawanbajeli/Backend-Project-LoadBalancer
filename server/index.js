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



//the following was second last update 
// const express = require('express');
// const { routeRequest } = require('./router'); // Import routeRequest only
// const logger = require('./logger');

// const app = express();
// app.use(express.json());



// // Middleware to log requested URL
// app.use((req, res, next) => {
//     console.log('Requested URL:', req.path);
//     next();
// });

// // Handle POST requests to /route endpoint
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

// // Handle GET requests to /route endpoint
// app.get('/route', (req, res) => {
//     res.send('GET request to /route endpoint');
// });

// const server = app.listen(3000, () => {
//     console.log('Load Balancer running on port 3000');
// });

// // Call processQueues after the server has started
// server.on('listening', () => {
//     const { processQueues } = require('./router'); // Import processQueues after the server has started
//     processQueues();
// });

//the latest update is following 

const express = require('express');
const { routeRequest } = require('./router'); // Import routeRequest only
const logger = require('./logger');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000; // Use port from environment variables or default to 3000

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

const server = app.listen(PORT, () => {
    console.log(`Load Balancer running on port ${PORT}`);
});

// Call processQueues after the server has started
server.on('listening', () => {
    const { processQueues } = require('./router'); // Import processQueues after the server has started
    processQueues();
});


