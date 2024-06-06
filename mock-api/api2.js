// const express = require('express');
// const app = express();
// const port = 5002;

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Welcome to API2');
// });

// // Helper function to simulate a delay
// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// app.get('/rest', async (req, res) => {
//     console.log('API2 received a REST request');
//     const responseTime = Math.random() * 2000; // Random delay up to 2000ms
//     await delay(responseTime);
//     res.json({ status: 'success', type: 'rest', responseTime });
// });

// app.get('/graphql', async (req, res) => {
//     console.log('API2 received a GraphQL request');
//     const responseTime = Math.random() * 2000; // Random delay up to 2000ms
//     await delay(responseTime);
//     res.json({ status: 'success', type: 'graphql', responseTime });
// });

// app.get('/grpc', async (req, res) => {
//     console.log('API2 received a gRPC request');
//     const responseTime = Math.random() * 2000; // Random delay up to 2000ms
//     await delay(responseTime);
//     res.json({ status: 'success', type: 'grpc', responseTime });
// });

// app.listen(port, () => {
//     console.log(`API2 is running on http://localhost:${port}`);
// });


const express = require('express'); // Import the Express framework
const app = express(); // Create an Express application
const port = 5002; // Set the port number

app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', (req, res) => {
    res.send('Welcome to API2'); // Respond with a welcome message for the root route
});

// Helper function to simulate a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

app.get('/rest', async (req, res) => {
    console.log('API2 received a REST request'); // Log the receipt of a REST request
    const responseTime = Math.random() * 2000; // Random delay up to 2000ms
    await delay(responseTime); // Simulate delay
    res.json({ status: 'success', type: 'rest', responseTime }); // Respond with success message and response time
});

app.get('/graphql', async (req, res) => {
    console.log('API2 received a GraphQL request'); // Log the receipt of a GraphQL request
    const responseTime = Math.random() * 2000; // Random delay up to 2000ms
    await delay(responseTime); // Simulate delay
    res.json({ status: 'success', type: 'graphql', responseTime }); // Respond with success message and response time
});

app.get('/grpc', async (req, res) => {
    console.log('API2 received a gRPC request'); // Log the receipt of a gRPC request
    const responseTime = Math.random() * 2000; // Random delay up to 2000ms
    await delay(responseTime); // Simulate delay
    res.json({ status: 'success', type: 'grpc', responseTime }); // Respond with success message and response time
});

app.listen(port, () => {
    console.log(`API2 is running on http://localhost:${port}`); // Log the server start message
});
