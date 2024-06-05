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
}

module.exports= FIFOQueue