const ExternalPriorityQueue = require('js-priority-queue');

class PriorityQueue {
    constructor() {
        this.queue = new ExternalPriorityQueue({ comparator: (a, b) => a.priority - b.priority });
    }

    enqueue(request) {
        this.queue.queue(request);
    }

    dequeue() {
        return this.queue.dequeue();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    
    size() {
        return this.queue.length;
    }
}

module.exports = PriorityQueue;
