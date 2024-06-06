

const winston = require('winston'); // Import the Winston logging library
const path = require('path'); // Import the path module

// Define the log directory
const logDirectory = path.join(__dirname, 'logs');

// Create the logger
const logger = winston.createLogger({
    level: 'info', // Set log level to 'info'
    format: winston.format.json(), // Use JSON format for logging
    defaultMeta: { service: 'load-balancer' }, // Add default metadata for service name
    transports: [
        new winston.transports.File({ filename: path.join(logDirectory, 'requests.log') }) // Add file transport for logging to requests.log file
    ],
});

module.exports = logger; // Export the logger

