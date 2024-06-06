const { endpoints, simulateResponseTime } = require('./endpoints');
const FIFOQueue = require('./fifoQueue');
const PriorityQueue = require('./priorityQueue');
const RoundRobinQueue = require('./RoundRobin');
const logger = require('./logger');
const axios = require('axios');

const fifoQueue = new FIFOQueue();
const priorityQueue = new PriorityQueue();
const roundRobinQueue = new RoundRobinQueue(endpoints);

function getNextEndpoint(apiType) {
    return roundRobinQueue.dequeue(apiType);
}

function routeRequest(apiType, payloadSize, customCriteria = null, res) {
    // Custom criteria handling
    switch (customCriteria) {
        case 'priority':
            priorityQueue.enqueue({ apiType, payloadSize, res });
            res.json({ status: 'queued', queue: customCriteria, apiType, payloadSize });
            break;
        case 'fifo':
            fifoQueue.enqueue({ apiType, payloadSize, res });
            res.json({ status: 'queued', queue: customCriteria, apiType, payloadSize });
            break;
        default:
            const selectedEndpoint = getNextEndpoint(apiType);
            const randomize = Math.random() < 0.5;
            const randomizedEndpoint = randomize ? getNextEndpoint(apiType) : selectedEndpoint;

            console.log(`Selected endpoint: ${randomizedEndpoint}`);
            handleRequest(apiType, payloadSize, 'round-robin', randomizedEndpoint, res);
            break;
    }
}

async function processQueues() {
    while (true) {
        if (!priorityQueue.isEmpty()) {
            const request = priorityQueue.dequeue();
            await handleRequest(request.apiType, request.payloadSize, 'priority', getNextEndpoint(request.apiType), request.res);
        } else if (!fifoQueue.isEmpty()) {
            const request = fifoQueue.dequeue();
            await handleRequest(request.apiType, request.payloadSize, 'fifo', getNextEndpoint(request.apiType), request.res);
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

async function handleRequest(apiType, payloadSize, queueType, selectedEndpoint, res) {
    const startTime = Date.now();
    try {
        await axios.get(selectedEndpoint);
        const endTime = Date.now();
        const responseTime = (endTime - startTime) / 1000;
        const service = selectedEndpoint.includes('5001') ? 'api1' : 'api2';

        logger.info({
            timestamp: new Date().toISOString(),
            apiType,
            payloadSize,
            queueType,
            selectedEndpoint,
            service, 
            responseTime
        });

        console.log(`Request from ${queueType} queue routed to ${selectedEndpoint} with response time ${responseTime}s`);

        if (!res.headersSent) {
            res.json({
                endpoint: selectedEndpoint,
                service, 
                response_time: responseTime
            });
        }
    } catch (error) {
        const errorMessage = `Failed to route request to ${selectedEndpoint}`;
        console.error(errorMessage);
        logger.error({
            timestamp: new Date().toISOString(),
            apiType,
            payloadSize,
            queueType,
            selectedEndpoint,
            error: `unable to connect to the ${selectedEndpoint}`
        });

        if (!res.headersSent) {
            res.status(500).json({ error: errorMessage });
        }
    }
}

module.exports = { routeRequest, processQueues };


