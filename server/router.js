


const { endpoints } = require('./endpoints'); // Import endpoints object from endpoints module
const FIFOQueue = require('./fifoQueue'); // Import FIFOQueue class from fifoQueue module
const PriorityQueue = require('./priorityQueue'); // Import PriorityQueue class from priorityQueue module
const RoundRobinQueue = require('./RoundRobin'); // Import RoundRobinQueue class from RoundRobin module
const logger = require('./logger'); // Import logger module
const axios = require('axios'); // Import axios library for making HTTP requests

const fifoQueue = new FIFOQueue(); // Create a new FIFOQueue instance
const priorityQueue = new PriorityQueue(); // Create a new PriorityQueue instance
const roundRobinQueue = new RoundRobinQueue(endpoints); // Create a new RoundRobinQueue instance with endpoints

/**
 * Get the next endpoint from the RoundRobinQueue for the specified API type.
 * @param {string} apiType - The type of API.
 * @returns {string} - The next endpoint.
 */
function getNextEndpoint(apiType) {
    return roundRobinQueue.dequeue(apiType);
}

/**
 * Route a request based on custom criteria or default to Round Robin.
 * @param {string} apiType - The type of API.
 * @param {number} payloadSize - The size of the payload.
 * @param {string|null} customCriteria - Custom routing criteria.
 * @param {Object} res - The response object.
 */
async function routeRequest(apiType, payloadSize, customCriteria = null, res) {
    try {
        switch (customCriteria) {
            case 'priority':
                priorityQueue.enqueue({ apiType, payloadSize, res });
                break;
            case 'fifo':
                fifoQueue.enqueue({ apiType, payloadSize, res });
                break;
            default:
                const selectedEndpoint = getNextEndpoint(apiType);
                await handleRequest(apiType, payloadSize, 'round-robin', selectedEndpoint, res);
                break;
        }
        res.json({ status: 'queued', queue: customCriteria, apiType, payloadSize });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        logger.error('Error processing request:', error);
    }
}

/**
 * Process the priority and FIFO queues.
 */
async function processQueues() {
    try {
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
    } catch (error) {
        logger.error('Error processing queues:', error);
    }
}

/**
 * Handle a request by sending it to the selected endpoint and logging the response.
 * @param {string} apiType - The type of API.
 * @param {number} payloadSize - The size of the payload.
 * @param {string} queueType - The type of queue.
 * @param {string} selectedEndpoint - The selected endpoint.
 * @param {Object} res - The response object.
 */
async function handleRequest(apiType, payloadSize, queueType, selectedEndpoint, res) {
    const startTime = Date.now();
    try {
        const response = await axios.get(selectedEndpoint);
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
                response_time: responseTime,
                data: response.data
            });
        }
    } catch (error) {
        const errorMessage = `Failed to route request to ${selectedEndpoint}: ${error.message}`;
        console.error(errorMessage);
        logger.error({
            timestamp: new Date().toISOString(),
            apiType,
            payloadSize,
            queueType,
            selectedEndpoint,
            error: errorMessage
        });

        if (!res.headersSent) {
            res.status(500).json({ error: errorMessage });
        }
    }
}

module.exports = { routeRequest, processQueues }; // Export routeRequest and processQueues functions
