// const { endpoints, simulateResponseTime } = require('./endpoints');
// const { fifoQueue, priorityQueue, roundRobinQueue } = require('./queues');
// const logger = require('./logger');

// function getNextEndpoint(apiType) {
//     const index = roundRobinQueue[apiType];
//     const endpoint = endpoints[apiType][index];
//     roundRobinQueue[apiType] = (index + 1) % endpoints[apiType].length;
//     return endpoint;
// }

// function routeRequest(apiType, payloadSize, customCriteria = null) {
//     if (customCriteria === 'priority') {
//         priorityQueue.queue({ apiType, payloadSize });
//     } else if (customCriteria === 'fifo') {
//         fifoQueue.push({ apiType, payloadSize });
//     } else {
//         const selectedEndpoint = getNextEndpoint(apiType);
//         return selectedEndpoint;
//     }
// }

// async function processQueues() {
//     while (true) {
//         if (priorityQueue.length > 0) {
//             const request = priorityQueue.dequeue();
//             await handleRequest(request.apiType, request.payloadSize, 'priority');
//         }
//         if (fifoQueue.length > 0) {
//             const request = fifoQueue.shift();
//             await handleRequest(request.apiType, request.payloadSize, 'fifo');
//         }
//         await new Promise(resolve => setTimeout(resolve, 100));
//     }
// }

// async function handleRequest(apiType, payloadSize, queueType) {
//     const selectedEndpoint = getNextEndpoint(apiType);
//     const startTime = Date.now();
//     await simulateResponseTime(selectedEndpoint);
//     const endTime = Date.now();

//     const responseTime = (endTime - startTime) / 1000;

//     logger.info({
//         timestamp: new Date().toISOString(),
//         apiType,
//         payloadSize,
//         queueType,
//         selectedEndpoint,
//         responseTime
//     });

//     console.log(`Request from ${queueType} queue routed to ${selectedEndpoint} with response time ${responseTime}s`);
// }

// module.exports = { routeRequest, processQueues };


const { endpoints, simulateResponseTime } = require('./endpoints');
const { fifoQueue, priorityQueue, roundRobinQueue } = require('./queues');
const logger = require('./logger');

function getNextEndpoint(apiType) {
    const index = roundRobinQueue[apiType];
    const endpoint = endpoints[apiType][index];
    roundRobinQueue[apiType] = (index + 1) % endpoints[apiType].length;
    return endpoint;
}


//let's change the custom criteria from null any other
function routeRequest(apiType, payloadSize, customCriteria = null, res) {
    if (customCriteria === 'priority') {
        priorityQueue.queue({ apiType, payloadSize, res });
    } else if (customCriteria === 'fifo') {
        fifoQueue.push({ apiType, payloadSize, res });
    } else {
        // For round-robin routing, process the request immediately
        const selectedEndpoint = getNextEndpoint(apiType);
        handleRequest(apiType, payloadSize, 'round-robin', selectedEndpoint, res);
    }
}

async function processQueues() {
    while (true) {
        if (priorityQueue.length > 0) {
            const request = priorityQueue.dequeue();
            await handleRequest(request.apiType, request.payloadSize, 'priority', request.res);
        } else if (fifoQueue.length > 0) {
            const request = fifoQueue.shift();
            await handleRequest(request.apiType, request.payloadSize, 'fifo', request.res);
        }
        await new Promise(resolve => setTimeout(resolve, 100)); // Avoid tight loop
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
    
    // Send the response back
    res.json({ endpoint: selectedEndpoint, response_time: responseTime });
}

module.exports = { routeRequest, processQueues };


