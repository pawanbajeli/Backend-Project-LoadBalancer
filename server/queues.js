const PriorityQueue = require('js-priority-queue');

const fifoQueue = [];
const priorityQueue = new PriorityQueue({ comparator: (a, b) => a.payloadSize - b.payloadSize });
let roundRobinQueue = { 'rest': 0, 'graphql': 0, 'grpc': 0 };

module.exports = { fifoQueue, priorityQueue, roundRobinQueue };
