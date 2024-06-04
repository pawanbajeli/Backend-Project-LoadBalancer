const PriorityQueue = require('js-priority-queue');

const fifoQueue = [];
const priorityQueue = new PriorityQueue({ comparator: (a, b) => a.priority - b.priority });
let roundRobinQueue = { 'rest': 0, 'graphql': 0, 'grpc': 0 };

module.exports = { fifoQueue, priorityQueue, roundRobinQueue };
