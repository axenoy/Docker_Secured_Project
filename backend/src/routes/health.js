const express = require('express');
const pool = require('../db/postgres')

const router = express.Router();

router.get('/', async (req, res) => { // async function, we do not need wait for response for continue the work.
    try {
        const result = await pool.query('SELECT NOW()'); // Wait for response, however Node.js serves another request, but not in this project :)

        res.json({ // Express give JSON output.
            status: 'ok',
            database_time: result.rows[0].now
        });
    } catch (error) {
        res.status(500).json({
            status: 'database_error'
        });
    }

});

module.exports = router; // export router for server.js usage