const express = require('express');
const { routeRequest } = require('./router');
const logger = require('./logger');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// Handle POST requests to /route endpoint
app.post('/route', async (req, res) => {
    try {
        const data = req.body;
        console.log('POST /route - Payload:', data);

        const apiType = data.apiType || 'rest';
        const payloadSize = Buffer.byteLength(JSON.stringify(data.payload || {}));
        const customCriteria = data.customCriteria;

        await routeRequest(apiType, payloadSize, customCriteria, res);
    } catch (error) {
        console.error('Error processing POST /route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle GET requests to /route endpoint
app.get('/route', (req, res) => {
    console.log('GET /route');
    res.send('GET request to /route endpoint');
});

// Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, your application is running!!');
});

const server = app.listen(PORT, () => {
    console.log(`Load Balancer running on port ${PORT}`);
});

// Call processQueues after the server has started
server.on('listening', () => {
    const { processQueues } = require('./router');
    processQueues();
});

