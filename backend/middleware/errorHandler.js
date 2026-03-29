const logger = require('./logger');

// Logging the error
function errorHandler(err, req, res, next) {
        logger.error('Unhandled error: %s', err.message, {
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        body: req.body
    });
    
    res.status(500).json({
        error: "Internal server error"
    });
}

module.exports = errorHandler;