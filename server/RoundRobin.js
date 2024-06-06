// class RoundRobinQueue {
//     constructor(endpoints, rotationInterval) {
//         this.endpoints = endpoints;
//         this.currentIndex = {};
//         this.rotationInterval = rotationInterval || 5000; // Default rotation interval of 5 seconds

//         for (const apiType in endpoints) {
//             this.currentIndex[apiType] = 0;
//         }

//         // Start rotating the endpoints
//         setInterval(() => {
//             this.rotateEndpoints();
//         }, this.rotationInterval);
//     }

//     dequeue(apiType) {
//         const endpoint = this.endpoints[apiType][this.currentIndex[apiType]];
//         this.currentIndex[apiType] = (this.currentIndex[apiType] + 1) % this.endpoints[apiType].length;
//         return endpoint;
//     }

//     rotateEndpoints() {
//         for (const apiType in this.currentIndex) {
//             this.currentIndex[apiType] = (this.currentIndex[apiType] + 1) % this.endpoints[apiType].length;
//         }
//     }

//     isEmpty() {
//         return false;
//     }
// }

// module.exports = RoundRobinQueue;



/**
 * Class representing a Round Robin Queue for rotating through API endpoints.
 */
class RoundRobinQueue {
    /**
     * Create a RoundRobinQueue.
     * @param {Object} endpoints - Object containing API endpoints grouped by type.
     * @param {number} rotationInterval - Interval (in milliseconds) for rotating the endpoints. Default is 5000 milliseconds (5 seconds).
     */
    constructor(endpoints, rotationInterval) {
        // Store the endpoints and current index for each API type
        this.endpoints = endpoints;
        this.currentIndex = {};

        // Set the rotation interval or use default (5 seconds)
        this.rotationInterval = rotationInterval || 5000;

        // Initialize current index for each API type
        for (const apiType in endpoints) {
            this.currentIndex[apiType] = 0;
        }

        // Start rotating the endpoints at the specified interval
        setInterval(() => {
            this.rotateEndpoints();
        }, this.rotationInterval);
    }

    /**
     * Dequeue an endpoint of the specified API type.
     * @param {string} apiType - The type of API.
     * @returns {string} - The dequeued endpoint.
     */
    dequeue(apiType) {
        // Get the current endpoint for the specified API type
        const endpoint = this.endpoints[apiType][this.currentIndex[apiType]];

        // Update the current index for the specified API type
        this.currentIndex[apiType] = (this.currentIndex[apiType] + 1) % this.endpoints[apiType].length;

        return endpoint;
    }

    /**
     * Rotate the endpoints for all API types.
     */
    rotateEndpoints() {
        // Iterate over each API type and update the current index
        for (const apiType in this.currentIndex) {
            this.currentIndex[apiType] = (this.currentIndex[apiType] + 1) % this.endpoints[apiType].length;
        }
    }

    /**
     * Check if the queue is empty (always returns false as this is not a typical queue).
     * @returns {boolean} - Always false.
     */
    isEmpty() {
        return false;
    }
}

module.exports = RoundRobinQueue;

