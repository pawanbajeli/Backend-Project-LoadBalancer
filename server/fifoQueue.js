

/**
 * Class representing a First In First Out (FIFO) Queue.
 */
class FIFOQueue {
    /**
     * Create a FIFOQueue.
     */
    constructor() {
        // Initialize an empty queue
        this.queue = [];
    }

    /**
     * Add a request to the end of the queue.
     * @param {*} request - The request to enqueue.
     */
    enqueue(request) {
        this.queue.push(request);
    }

    /**
     * Remove and return the first request from the queue.
     * @returns {*} - The dequeued request.
     */
    dequeue() {
        return this.queue.shift();
    }

    /**
     * Check if the queue is empty.
     * @returns {boolean} - True if the queue is empty, false otherwise.
     */
    isEmpty() {
        return this.queue.length === 0;
    }

    /**
     * Get the size of the queue.
     * @returns {number} - The number of elements in the queue.
     */
    size() {
        return this.queue.length;
    }
}

module.exports = FIFOQueue; // Export the FIFOQueue class
