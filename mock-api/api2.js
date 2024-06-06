const express = require('express');
const app = express();
const port = 5002;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to API2');
});

// Helper function to simulate a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

app.get('/rest', async (req, res) => {
    console.log('API2 received a REST request');
    const responseTime = Math.random() * 2000; // Random delay up to 2000ms
    await delay(responseTime);
    res.json({ status: 'success', type: 'rest', responseTime });
});

app.get('/graphql', async (req, res) => {
    console.log('API2 received a GraphQL request');
    const responseTime = Math.random() * 2000; // Random delay up to 2000ms
    await delay(responseTime);
    res.json({ status: 'success', type: 'graphql', responseTime });
});

app.get('/grpc', async (req, res) => {
    console.log('API2 received a gRPC request');
    const responseTime = Math.random() * 2000; // Random delay up to 2000ms
    await delay(responseTime);
    res.json({ status: 'success', type: 'grpc', responseTime });
});

app.listen(port, () => {
    console.log(`API2 is running on http://localhost:${port}`);
});
