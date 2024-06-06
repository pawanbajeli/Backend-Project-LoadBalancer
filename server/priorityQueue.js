

const ExternalPriorityQueue = require('js-priority-queue'); // Import the js-priority-queue module

/**
 * Class representing a Priority Queue.
 */
class PriorityQueue {
    /**
     * Create a PriorityQueue.
     */
    constructor() {
        // Initialize a priority queue with custom comparator function
        this.queue = new ExternalPriorityQueue({ comparator: (a, b) => a.priority - b.priority });
    }

    /**
     * Add a request to the priority queue.
     * @param {*} request - The request to enqueue.
     */
    enqueue(request) {
        this.queue.queue(request);
    }

    /**
     * Remove and return the highest priority request from the queue.
     * @returns {*} - The dequeued request.
     */
    dequeue() {
        return this.queue.dequeue();
    }

    /**
     * Check if the priority queue is empty.
     * @returns {boolean} - True if the queue is empty, false otherwise.
     */
    isEmpty() {
        return this.queue.length === 0;
    }

    /**
     * Get the size of the priority queue.
     * @returns {number} - The number of elements in the queue.
     */
    size() {
        return this.queue.length;
    }
}

module.exports = PriorityQueue; // Export the PriorityQueue class

