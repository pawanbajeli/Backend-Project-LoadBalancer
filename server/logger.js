const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'load-balancer' },
    transports: [
        new winston.transports.File({ filename: 'logs/requests.log' })
    ],
});

module.exports = logger;
