const express = require('express');
const { routeRequest, processQueues } = require('./router');
const logger = require('./logger');

const app = express();
app.use(express.json());

app.post('/route', async (req, res) => {
    const data = req.body;
    const apiType = data.apiType || 'rest';
    const payloadSize = Buffer.byteLength(JSON.stringify(data.payload || {}));
    const customCriteria = data.customCriteria;

    routeRequest(apiType, payloadSize, customCriteria);

    res.json({ status: 'queued', queue: customCriteria || 'round-robin', apiType, payloadSize });
});

app.listen(3000, () => {
    console.log('Load Balancer running on port 3000');
    processQueues();
});
