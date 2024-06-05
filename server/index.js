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

    // routeRequest handles the response, so we should not send any additional response here
    routeRequest(apiType, payloadSize, customCriteria, res);
});

app.listen(3000, () => {
    console.log('Load Balancer running on port 3000');
    processQueues();
});
