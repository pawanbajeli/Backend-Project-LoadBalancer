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

// const express = require('express');
// const { routeRequest } = require('./router'); // Import routeRequest only
// const logger = require('./logger');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 3000; // Use port from environment variables or default to 3000

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

// const server = app.listen(PORT, () => {
//     console.log(`Load Balancer running on port ${PORT}`);
// });

// // Call processQueues after the server has started
// server.on('listening', () => {
//     const { processQueues } = require('./router'); // Import processQueues after the server has started
//     processQueues();
// });

// const express = require('express');
// const { routeRequest } = require('./router'); // Import routeRequest only
// const logger = require('./logger');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 3000; // Use port from environment variables or default to 3000

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

// // Add a route for the root URL
// app.get('/', (req, res) => {
//     res.send('Hello, your application running !!');
// });

// const server = app.listen(PORT, () => {
//     console.log(`Load Balancer running on port ${PORT}`);
// });

// // Call processQueues after the server has started
// server.on('listening', () => {
//     const { processQueues } = require('./router'); // Import processQueues after the server has started
//     processQueues();
// });


// const express = require('express');
// const { routeRequest } = require('./router'); // Import routeRequest only
// const logger = require('./logger');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 3000; // Use port from environment variables or default to 3000

// // Middleware to log all incoming requests
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
//     next();
// });

// // Handle POST requests to /route endpoint
// app.post('/route', (req, res) => {
//     const data = req.body;
//     console.log('POST /route - Payload:', data);

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
//     console.log('GET /route');
//     res.send('GET request to /route endpoint');
// });

// // Add a route for the root URL
// app.get('/', (req, res) => {
//     res.send('Hello, your application is running!!');
// });

// const server = app.listen(PORT, () => {
//     console.log(`Load Balancer running on port ${PORT}`);
// });

// // Call processQueues after the server has started
// server.on('listening', () => {
//     const { processQueues } = require('./router'); // Import processQueues after the server has started
//     processQueues();
// });

const express = require('express');
const { routeRequest } = require('./router'); // Import routeRequest only
const logger = require('./logger');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000; // Use port from environment variables or default to 3000
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://pawan-singh-wasserstoff-backend-task.vercel.app' : `http://localhost:${PORT}`;

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// Handle POST requests to /route endpoint
app.post('/route', (req, res) => {
    const data = req.body;
    console.log('POST /route - Payload:', data);

    const apiType = data.apiType || 'rest';
    const payloadSize = Buffer.byteLength(JSON.stringify(data.payload || {}));
    const customCriteria = data.customCriteria;

    // Route the request to the correct endpoint based on the base URL
    routeRequest(`${BASE_URL}/route`, apiType, payloadSize, customCriteria, res);
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
    const { processQueues } = require('./router'); // Import processQueues after the server has started
    processQueues();
});

