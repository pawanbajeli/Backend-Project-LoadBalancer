const express = require('express');
const app = express();

app.use(express.json());

app.get('/rest', (req, res) => {
    setTimeout(() => {
        res.json({ status: 'success', type: 'rest' });
    }, 1000); // Simulate response time
});

app.get('/graphql', (req, res) => {
    setTimeout(() => {
        res.json({ status: 'success', type: 'graphql' });
    }, 1500); // Simulate response time
});

app.get('/grpc', (req, res) => {
    setTimeout(() => {
        res.json({ status: 'success', type: 'grpc' });
    }, 500); // Simulate response time
});

app.listen(5002, () => {
    console.log('Mock API running on port 5002');
});
