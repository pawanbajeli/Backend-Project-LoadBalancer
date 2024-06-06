
const fs = require('fs'); // Import the file system module
const _ = require('lodash'); // Import the lodash library

/**
 * The main function responsible for orchestrating the performance analysis process.
 */
function main() {
    const logFilePath = 'logs/requests.log'; // Path to the log file
    const analysisFilePath = 'JsonFiles/analysis.json'; // Path to the analysis output file

    try {
        // Parse the log file and extract valid JSON data
        const parsedData = parseLogFile(logFilePath);

        // Group the parsed data by queue type
        const groupedData = groupDataByQueue(parsedData);

        // Calculate metrics based on grouped data
        const metrics = calculateMetrics(groupedData);

        // Analyze performance based on calculated metrics
        const performance = analyzePerformance(metrics);

        // Write the performance analysis to a JSON file
        writePerformanceToFile(performance, analysisFilePath);

        // Log the success message
        console.log(`Performance analysis has been written to ${analysisFilePath}`);
    } catch (error) {
        // Log any errors that occur during the process
        console.error('An error occurred:', error.message);
    }
}

/**
 * Parse the log file and return valid JSON data.
 * @param {string} filePath - Path to the log file.
 * @returns {Array} - Array of parsed JSON objects.
 */
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

/**
 * Group parsed data by queue type.
 * @param {Array} parsedData - Array of parsed JSON objects.
 * @returns {Object} - Object containing data grouped by queue type.
 */
function groupDataByQueue(parsedData) {
    return _.groupBy(parsedData, 'message.queueType');
}

/**
 * Calculate metrics based on grouped data.
 * @param {Object} groupedData - Data grouped by queue type.
 * @returns {Object} - Object containing calculated metrics.
 */
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

/**
 * Analyze performance based on calculated metrics.
 * @param {Object} metrics - Object containing calculated metrics.
 * @returns {Object} - Object containing performance analysis.
 */
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

/**
 * Determine performance analysis based on average response time.
 * @param {number} averageResponseTime - Average response time for a queue.
 * @returns {string} - Performance analysis message.
 */
function determinePerformanceAnalysis(averageResponseTime) {
    if (averageResponseTime < 0.5) {
        return 'Excellent performance with fast response times.';
    } else if (averageResponseTime < 1) {
        return 'Good performance with moderate response times.';
    } else {
        return 'Performance needs improvement with slow response times.';
    }
}

/**
 * Get the load balancing algorithm based on the queue type.
 * @param {string} queueType - Type of queue.
 * @returns {string} - Load balancing algorithm.
 */
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

/**
 * Write performance data to a JSON file.
 * @param {Object} performance - Performance data to write.
 * @param {string} filePath - Path to the output file.
 */
function writePerformanceToFile(performance, filePath) {
    fs.writeFileSync(filePath, JSON.stringify(performance, null, 2));
}

// Execute the main function
main();

