const path = require('path');
const { createLogger, transports, format } = require('winston');

const errorLogPath = path.join(__dirname, '../../Bclogs/error.log');
const combinedLogPath = path.join(__dirname, '../../Bclogs/combined.log');

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