class RoundRobinQueue {
    constructor(endpoints, rotationInterval) {
        this.endpoints = endpoints;
        this.currentIndex = {};
        this.rotationInterval = rotationInterval || 5000; // Default rotation interval of 5 seconds

        for (const apiType in endpoints) {
            this.currentIndex[apiType] = 0;
        }

        // Start rotating the endpoints
        setInterval(() => {
            this.rotateEndpoints();
        }, this.rotationInterval);
    }

    dequeue(apiType) {
        const endpoint = this.endpoints[apiType][this.currentIndex[apiType]];
        this.currentIndex[apiType] = (this.currentIndex[apiType] + 1) % this.endpoints[apiType].length;
        return endpoint;
    }

    rotateEndpoints() {
        for (const apiType in this.currentIndex) {
            this.currentIndex[apiType] = (this.currentIndex[apiType] + 1) % this.endpoints[apiType].length;
        }
    }

    isEmpty() {
        return false;
    }
}

module.exports = RoundRobinQueue;
