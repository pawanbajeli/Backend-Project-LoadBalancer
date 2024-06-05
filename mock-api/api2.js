const express = require('express');
const app = express();
const port = 5002; // Different port for API2

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to API2');
});

app.get('/rest', (req, res) => {
    console.log('API2 received a REST request');
    setTimeout(() => {
        res.json({ status: 'success', type: 'rest' });
    }, 1000); // Simulate response time
});

app.get('/graphql', (req, res) => {
    console.log('API2 received a GraphQL request');
    setTimeout(() => {
        res.json({ status: 'success', type: 'graphql' });
    }, 1500); // Simulate response time
});

app.get('/grpc', (req, res) => {
    console.log('API2 received a gRPC request');
    setTimeout(() => {
        res.json({ status: 'success', type: 'grpc' });
    }, 500); // Simulate response time
});

app.listen(port, () => {
    console.log(`API2 is running on http://localhost:${port}`);
});
