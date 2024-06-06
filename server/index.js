

const express = require('express'); // Import the Express framework
const { routeRequest } = require('./router'); // Import the routeRequest function from router module
const logger = require('./logger'); // Import the logger module
const dotenv = require('dotenv'); // Import the dotenv module for environment variables

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application
app.use(express.json()); // Middleware to parse JSON request bodies

const PORT = process.env.PORT || 3000; // Get the port number from environment variable or default to 3000

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`); // Log request method, URL, and timestamp
    next(); // Call the next middleware in the stack
});

// Handle POST requests to /route endpoint
app.post('/route', async (req, res) => {
    try {
        const data = req.body; // Extract request body
        console.log('POST /route - Payload:', data); // Log the request payload

        const apiType = data.apiType || 'rest'; // Extract API type from request or default to 'rest'
        const payloadSize = Buffer.byteLength(JSON.stringify(data.payload || {})); // Calculate payload size
        const customCriteria = data.customCriteria; // Extract custom criteria from request

        // Route the request based on API type, payload size, and custom criteria
        await routeRequest(apiType, payloadSize, customCriteria, res);
    } catch (error) {
        console.error('Error processing POST /route:', error); // Log any errors that occur during request processing
        res.status(500).json({ error: 'Internal Server Error' }); // Send internal server error response
    }
});

// Handle GET requests to /route endpoint
app.get('/route', (req, res) => {
    console.log('GET /route'); // Log GET request to /route endpoint
    res.send('GET request to /route endpoint'); // Send response for GET request to /route endpoint
});

// Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, your application is running!!'); // Send response for root URL
});

const server = app.listen(PORT, () => {
    console.log(`Load Balancer running on port ${PORT}`); // Log server start message
});

// Call processQueues after the server has started
server.on('listening', () => {
    const { processQueues } = require('./router'); // Import processQueues function from router module
    processQueues(); // Execute processQueues function
});
