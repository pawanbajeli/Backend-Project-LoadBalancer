class FIFOQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(request) {
        this.queue.push(request);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    // Add a method to get the size of the queue
    size() {
        return this.queue.length;
    }
}

module.exports = FIFOQueue;
