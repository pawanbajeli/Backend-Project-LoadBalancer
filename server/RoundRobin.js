class RoundRobinQueue {
    constructor(endpoints) {
        this.endpoints = endpoints;
        this.currentIndex = {}; 
        for (const apiType in endpoints) {
            this.currentIndex[apiType] = 0; 
        }
    }

    dequeue(apiType) {
        const endpoint = this.endpoints[apiType][this.currentIndex[apiType]]; 
        this.currentIndex[apiType] = (this.currentIndex[apiType] + 1) % this.endpoints[apiType].length;
        return endpoint;
    }

    isEmpty() {
        return false; 
    }
}
module.exports= RoundRobinQueue