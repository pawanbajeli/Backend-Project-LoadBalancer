const express = require('express');
const app = express();
const port = 5001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to API1');
});

app.get('/rest', (req, res) => {
    console.log('API1 received a REST request');
    setTimeout(() => {
        res.json({ status: 'success', type: 'rest' });
    }, 1000); // Simulate response time
});

app.get('/graphql', (req, res) => {
    console.log('API1 received a GraphQL request');
    setTimeout(() => {
        res.json({ status: 'success', type: 'graphql' });
    }, 1500); // Simulate response time
});

app.get('/grpc', (req, res) => {
    console.log('API1 received a gRPC request');
    setTimeout(() => {
        res.json({ status: 'success', type: 'grpc' });
    }, 500); // Simulate response time
});

app.listen(port, () => {
    console.log(`API1 is running on http://localhost:${port}`);
});
