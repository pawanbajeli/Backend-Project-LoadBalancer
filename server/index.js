const express = require('express');
const { routeRequest, processQueues } = require('./router');
const logger = require('./logger');

const app = express();
app.use(express.json());

app.post('/route', (req, res) => {
    const data = req.body;
    const apiType = data.apiType || 'rest';
    const payloadSize = Buffer.byteLength(JSON.stringify(data.payload || {}));
    const customCriteria = data.customCriteria;

    routeRequest(apiType, payloadSize, customCriteria, res);

    if (customCriteria !== 'priority' && customCriteria !== 'fifo') {
        res.json({ status: 'processed', queue: 'round-robin', apiType, payloadSize });
    } else {
        res.json({ status: 'queued', queue: customCriteria, apiType, payloadSize });
    }
});

app.listen(3000, () => {
    console.log('Load Balancer running on port 3000');
    processQueues();
});
