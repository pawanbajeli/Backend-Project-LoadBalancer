const { endpoints, simulateResponseTime } = require('./endpoints');
const FIFOQueue = require('./fifoQueue'); 
const PriorityQueue=require('./priorityQueue');
const RoundRobinQueue=require('./RoundRobin');
const logger = require('./logger');

const fifoQueue = new FIFOQueue(); // Initialize FIFOQueue
const priorityQueue = new PriorityQueue(); // Initialize PriorityQueue
const roundRobinQueue = new RoundRobinQueue(endpoints);



function getNextEndpoint(apiType) {
    return roundRobinQueue.dequeue(apiType);
}

function routeRequest(apiType, payloadSize, customCriteria = null, res) {
    if (customCriteria === 'priority') {
        priorityQueue.enqueue({ apiType, payloadSize, res }); // Use enqueue for PriorityQueue
        res.json({ status: 'queued', queue: customCriteria, apiType, payloadSize });
    } else if (customCriteria === 'fifo') {
        fifoQueue.enqueue({ apiType, payloadSize, res }); // Use enqueue for FIFOQueue
        res.json({ status: 'queued', queue: customCriteria, apiType, payloadSize });
    } else {
        // For round-robin routing, process the request immediately
        const selectedEndpoint = getNextEndpoint(apiType);
        handleRequest(apiType, payloadSize, 'round-robin', selectedEndpoint, res);
    }
}

async function processQueues() {
    while (true) {
        if (!priorityQueue.isEmpty()) {
            const request = priorityQueue.dequeue(); // Use dequeue for PriorityQueue
            await handleRequest(request.apiType, request.payloadSize, 'priority', getNextEndpoint(request.apiType), request.res);
        } else if (!fifoQueue.isEmpty()) {
            const request = fifoQueue.dequeue(); // Use dequeue for FIFOQueue
            await handleRequest(request.apiType, request.payloadSize, 'fifo', getNextEndpoint(request.apiType), request.res);
        }
        await new Promise(resolve => setTimeout(resolve, 100)); 
    }
}

async function handleRequest(apiType, payloadSize, queueType, selectedEndpoint, res) {
    const startTime = Date.now();
    await simulateResponseTime(selectedEndpoint);
    const endTime = Date.now();

    const responseTime = (endTime - startTime) / 1000;

    logger.info({
        timestamp: new Date().toISOString(),
        apiType,
        payloadSize,
        queueType,
        selectedEndpoint,
        responseTime
    });

    console.log(`Request from ${queueType} queue routed to ${selectedEndpoint} with response time ${responseTime}s`);
    
    // Send the response back only if it hasn't been sent already
    if (!res.headersSent) {
        res.json({ endpoint: selectedEndpoint, response_time: responseTime });
    }
}

module.exports = { routeRequest, processQueues };