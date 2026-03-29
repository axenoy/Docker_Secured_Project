// We're using pool logic, because we do not create new connection for each new request. 
const { Pool } = require('pg');
// dotenv library read .env file and calls it by process.env usage.
require('dotenv').config();

// Create the pool of connections, which variables is taken from .env file.
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
// Exporting the module, so it can be reused across the app.
// smth like: const pool = require('./db/postgres');
module.exports = pool;