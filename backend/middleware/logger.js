const path = require('path');
const { createLogger, transports, format } = require('winston');

const logDir = path.join(process.cwd(), 'logs'); 

const errorLogPath = path.join(logDir, 'error.log');
const combinedLogPath = path.join(logDir, 'combined.log');


const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }), // catch calls stack too
        format.splat(), // Format for correct variables substitution as %s, %f...
        format.json() // Saving in JSON-format, will be needed later for monitoring.
    ),
    transports: [
        new transports.File({ filename: errorLogPath, level: 'error' }),
        new transports.File({ filename: combinedLogPath }),
        new transports.Console({ format: format.simple() }),
    ]
});

module.exports = logger;