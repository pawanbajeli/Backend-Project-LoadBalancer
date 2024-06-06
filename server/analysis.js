const fs = require('fs');
const _ = require('lodash');

function main() {
    const logFilePath = 'logs/requests.log';
    const analysisFilePath = 'JsonFiles/analysis.json';

    try {
        const parsedData = parseLogFile(logFilePath);
        const groupedData = groupDataByQueue(parsedData);
        const metrics = calculateMetrics(groupedData);
        const performance = analyzePerformance(metrics);

        writePerformanceToFile(performance, analysisFilePath);

        console.log(`Performance analysis has been written to ${analysisFilePath}`);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

function parseLogFile(filePath) {
    const logData = fs.readFileSync(filePath, 'utf8').split('\n');
    const validJsonData = logData.filter(line => {
        try {
            JSON.parse(line);
            return true;
        } catch (error) {
            console.error('Invalid JSON data:', error.message);
            return false;
        }
    });
    return validJsonData.map(line => JSON.parse(line));
}

function groupDataByQueue(parsedData) {
    return _.groupBy(parsedData, 'message.queueType');
}

function calculateMetrics(groupedData) {
    const metrics = {};
    for (const queueType in groupedData) {
        const data = groupedData[queueType];
        const responseTimes = data.map((entry) => entry.message.responseTime);
        metrics[queueType] = {
            averageResponseTime: _.mean(responseTimes),
            throughput: data.length,
        };
    }
    return metrics;
}

function analyzePerformance(metrics) {
    const performance = {};
    for (const queueType in metrics) {
        const performanceAnalysis = determinePerformanceAnalysis(metrics[queueType].averageResponseTime);
        performance[queueType] = {
            averageResponseTime: metrics[queueType].averageResponseTime,
            throughput: metrics[queueType].throughput,
            performanceAnalysis: performanceAnalysis,
            loadBalancingAlgorithm: getLoadBalancingAlgorithm(queueType),
        };
    }
    return performance;
}

function determinePerformanceAnalysis(averageResponseTime) {
    if (averageResponseTime < 0.5) {
        return 'Excellent performance with fast response times.';
    } else if (averageResponseTime < 1) {
        return 'Good performance with moderate response times.';
    } else {
        return 'Performance needs improvement with slow response times.';
    }
}

function getLoadBalancingAlgorithm(queueType) {
    switch (queueType) {
        case 'round-robin':
            return 'Round Robin';
        case 'priority':
            return 'Priority Queue';
        case 'fifo':
            return 'First In First Out (FIFO)';
        default:
            return 'Unknown Algorithm';
    }
}

function writePerformanceToFile(performance, filePath) {
    fs.writeFileSync(filePath, JSON.stringify(performance, null, 2));
}


main();
