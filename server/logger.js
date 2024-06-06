// const winston = require('winston');

// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'load-balancer' },
//     transports: [
//         new winston.transports.File({ filename: 'server/logs/requests.log' })
//     ],
// });

// module.exports = logger;


const winston = require('winston');
const path = require('path');

// Define the log directory
const logDirectory = path.join(__dirname, 'logs');

// Create the logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'load-balancer' },
    transports: [
        new winston.transports.File({ filename: path.join(logDirectory, 'requests.log') })
    ],
});

module.exports = logger;
